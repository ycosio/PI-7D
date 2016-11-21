<?php
header('Content-Type: application/json');
if($_GET)
{
$id=$_GET['id'];
$nombre=$_GET['nombre'];
$apellido=$_GET['apellido'];
$correo=$_GET['correo'];
$domicilio=$_GET['domicilio'];
$telefono=$_GET['telefono'];

class MiBD extends SQLite3
{
function __construct()
{
$this->open('PI.db');
}
}

$bd = new MiBD();

$cadena='INSERT INTO Cliente(id_vendedor,nombre,apellido,domicilio,telefono,correo) VALUES ('.$id.',"'.$nombre.'","'.$apellido.'","'.$domicilio.'","'.$telefono.'","'.$correo.'")';
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>