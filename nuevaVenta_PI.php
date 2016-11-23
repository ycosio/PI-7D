<?php
header('Content-Type: application/json');
if($_GET)
{
$id_Producto=$_GET['id_Producto'];
$precio_Producto=$_GET['precio_Producto'];
$id_Cliente=$_GET['id_Cliente'];
$cantidad=$_GET['cantidad'];
$plazo=$_GET['plazo'];
$pagosPendientes=intval($_GET['pagos']);

class MiBD extends SQLite3
{
	function __construct()
	{
		$this->open('PI.db');
	}
}

$bd = new MiBD();

$total=intval($precio_Producto)*intval($cantidad);

$montoPago=intval($total)/intval($pagosPendientes);

$cadena='INSERT INTO Ventas(id_Cliente,id_Producto,fecha_Compra,cantidad,total,plazo,montoPorPago,pagosPendientes,montoPendiente) VALUES ("'.$id_Cliente.'","'.$id_Producto.'",(select date("now")),"'.$cantidad.'","'.$total.'","'.$plazo.'","'.$montoPago.'","'.$pagosPendientes.'","'.$total.'")';
//echo $cadena;
$bd->exec($cadena);

$cadena='UPDATE Productos SET cantidad=cantidad-' .intval($cantidad). ' WHERE id='.$id_Producto;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>