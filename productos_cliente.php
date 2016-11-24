<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$id=$_GET['id'];
$contador=0;

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Productos.*, Ventas.* FROM Productos
	LEFT JOIN Ventas ON Productos.id=Ventas.id_Producto
	LEFT JOIN Cliente ON Ventas.id_cliente=Cliente.id
	WHERE Cliente.id='.$id.' and Ventas.pagosPendientes>0');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id_Producto'].'","nombre":"'.$row['nombre'].'","precio":"'.$row['precio'].'","cantidad":"'.$row['cantidad'].'","descripcion":"'.$row['descripcion'].'","pagosPendientes":"'.$row["pagosPendientes"].'","montoPendiente":"'.$row['montoPendiente'].'","montoPorPago":"'.$row["montoPorPago"].'"},';
	$contador++;
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';

if($contador==0)
	$cadena=null;

print_r($cadena);
?>