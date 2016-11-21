<?php
header('Content-Type: application/json');
if($_GET)
{
$id=$_GET['id'];

class MiBD extends SQLite3
{
function __construct()
{
$this->open('PI.db');
}
}

$bd = new MiBD();

$cadena='DELETE FROM Productos WHERE id='.$id;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>