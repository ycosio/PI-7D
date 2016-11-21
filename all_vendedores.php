<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Vendedor.* FROM Vendedor');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","nombre":"'.$row['nombre'].'","apellidos":"'.$row['apellidos'].'","correo":"'.$row['correo'].'","password":"'.$row['password'].'"},';
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';
print_r($cadena);
?>