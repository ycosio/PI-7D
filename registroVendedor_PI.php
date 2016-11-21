<?php
header('Content-Type: application/json');
if($_GET)
{
$nombre=$_GET['nombre'];
$apellidos=$_GET['apellidos'];
$correo=$_GET['correo'];
$pass=$_GET['pass'];

class MiBD extends SQLite3
{
function __construct()
{
$this->open('PI.db');
}
}

$bd = new MiBD();

$cadena='INSERT INTO Vendedor(nombre,apellidos,correo,password) VALUES ("'.$nombre.'","'.$apellidos.'","'.$correo.'","'.$pass.'")';
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>