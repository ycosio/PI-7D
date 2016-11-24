<?php
header('Content-Type: application/json');
if($_GET)
{
$id_Cliente=$_GET['id_Cliente'];
$monto=$_GET['monto'];
$id_Producto=$_GET['id_Producto'];

class MiBD extends SQLite3
{
	function __construct()
	{
		$this->open('PI.db');
	}
}

$bd = new MiBD();

$cadena='INSERT INTO Abonos(id_Cliente,fecha,monto) VALUES ("'.$id_Cliente.'",(select date("now")),"'.$monto.'")';
//echo $cadena;
$bd->exec($cadena);

$cadena='UPDATE Ventas SET montoPendiente=montoPendiente-' .intval($monto). ' , pagosPendientes=pagosPendientes-1 WHERE id_Cliente='.$id_Cliente.' and id_Producto='.$id_Producto;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>