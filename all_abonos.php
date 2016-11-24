<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Abonos.* FROM Abonos');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","id_Cliente":"'.$row['id_Cliente'].'","fecha":"'.$row['fecha'].'","monto":"'.$row['monto'].'"},';
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';
print_r($cadena);
?>