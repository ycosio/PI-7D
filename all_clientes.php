<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Cliente.* FROM Cliente');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","nombre":"'.$row['nombre'].'","apellido":"'.$row['apellido'].'","domicilio":"'.$row['domicilio'].'","telefono":"'.$row['telefono'].'","correo":"'.$row['correo'].'"},';
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';
print_r($cadena);
?>