<?php
header('Content-Type: application/json');
if($_GET)
{
$id=$_GET['id'];
$nombre=$_GET['nombre'];
$apellido=$_GET['apellido'];
$domicilio=$_GET['domicilio'];
$telefono=$_GET['telefono'];
$correo=$_GET['correo'];

class MiBD extends SQLite3
{
function __construct()
{
$this->open('PI.db');
}
}

$bd = new MiBD();

$cadena='UPDATE Cliente SET nombre="'.$nombre. '", apellido="'.$apellido.'", domicilio="'.$domicilio.'", telefono="'.$telefono.'", correo="'.$correo.'" WHERE id='.$id;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>