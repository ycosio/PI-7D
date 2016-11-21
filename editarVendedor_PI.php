<?php
header('Content-Type: application/json');
if($_GET)
{
$id=$_GET['id'];
$nombre=$_GET['nombre'];
$apellidos=$_GET['apellidos'];
$correo=$_GET['correo'];
$password=$_GET['password'];


class MiBD extends SQLite3
{
function __construct()
{
$this->open('PI.db');
}
}

$bd = new MiBD();

$cadena='UPDATE Vendedor SET nombre="'.$nombre. '", apellidos="'.$apellidos.'", correo="'.$correo.'", password="'.$password.'" WHERE id='.$id;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>