<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$correo=$_GET['correo'];
$pass=$_GET['pass'];

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Vendedor.* FROM Vendedor  
	WHERE Vendedor.correo="'.$correo.'" and Vendedor.password="'.$pass.'"');
$contador=0;

$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","nombre":"'.$row['nombre'].'","apellidos":"'.$row['apellidos'].'","correo":"'.$row['correo'].'","password":"'.$row['password'].'"},';
	$contador++;
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';

if($contador==0)
	$cadena=null;

print_r($cadena);
?>