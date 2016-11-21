<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Productos.* FROM Productos');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","nombre":"'.$row['nombre'].'","precio":"'.$row['precio'].'","cantidad":"'.$row['cantidad'].'","descripcion":"'.$row['descripcion'].'"},';
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';
print_r($cadena);
?>