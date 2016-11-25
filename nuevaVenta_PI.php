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
$hoy = getdate();
$montoPago=intval($total)/intval($pagosPendientes);
$mes=$hoy['mon'];
	switch ($plazo) {
		case '1':
			$dia=((intval($hoy['mday'])/7)*7)+7;
			if($dia>30)
			{
				$dia=$dia-30;
				$mes=intval($hoy[1])+1;
				if($mes>12);
					$mes=1;
			}
			break;

		case '2':
			$dia=((intval($hoy['mday'])/15)*15)+15;
			if($dia>30)
			{
				$dia=15;
				$mes=intval($hoy['mon'])+1;
				if($mes>12);
					$mes=1;
			}
			break;
		
		case '3':
				$mes=intval($hoy['mon'])+1;
					if($mes>12);
					$mes=1;
				$dia=30;
			break;
	}

	$siguientePago=$dia."-".$mes."-".$hoy['year'];

$cadena='INSERT INTO Ventas(id_Cliente,id_Producto,fecha_Compra,cantidad,total,plazo,montoPorPago,pagosPendientes,montoPendiente,siguientePago) VALUES ("'.$id_Cliente.'","'.$id_Producto.'",(select date("now")),"'.$cantidad.'","'.$total.'","'.$plazo.'","'.$montoPago.'","'.$pagosPendientes.'","'.$total.'","'.$siguientePago.'")';
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