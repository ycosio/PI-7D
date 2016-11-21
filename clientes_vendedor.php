<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$id=$_GET['id'];
$contador=0;

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Cliente.* FROM Cliente 
LEFT JOIN Vendedor ON Vendedor.id=Cliente.id_vendedor
WHERE Vendedor.id='.$id);
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","nombre":"'.$row['nombre'].'","apellido":"'.$row['apellido'].'","domicilio":"'.$row['domicilio'].'","telefono":"'.$row['telefono'].'","correo":"'.$row['correo'].'"},';
	$contador++;
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';

if($contador==0)
	$cadena=null;
print_r($cadena);
?>