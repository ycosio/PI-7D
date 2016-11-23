<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$id=$_GET['id'];
$contador=0;

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Productos.* FROM Productos
	LEFT JOIN Vendedor ON Vendedor.id=Productos.id_vendedor
	WHERE Productos.cantidad>0 and Vendedor.id='.$id);
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","nombre":"'.$row['nombre'].'","precio":"'.$row['precio'].'","cantidad":"'.$row['cantidad'].'","descripcion":"'.$row['descripcion'].'"},';
	$contador++;
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';

if($contador==0)
	$cadena=null;

print_r($cadena);
?>