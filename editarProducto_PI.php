<?php
header('Content-Type: application/json');
if($_GET)
{
$id=$_GET['id'];
$nombre=$_GET['nombre'];
$precio=$_GET['precio'];
$cantidad=$_GET['cantidad'];
$descripcion=$_GET['descripcion'];

class MiBD extends SQLite3
{
function __construct()
{
$this->open('PI.db');
}
}

$bd = new MiBD();

$cadena='UPDATE Productos SET nombre="'.$nombre. '", precio='.$precio.', cantidad='.$cantidad.', descripcion="'.$descripcion.'" WHERE id='.$id;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>