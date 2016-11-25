<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$id=$_GET['id'];
$contador=0;

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Productos.*, Ventas.*, Ventas.id AS id_Venta, Cliente.nombre AS Cliente FROM Productos
	LEFT JOIN Ventas ON Productos.id=Ventas.id_Producto
	LEFT JOIN Cliente ON Ventas.id_cliente=Cliente.id
	WHERE Cliente.id_vendedor='.$id.' and Ventas.pagosPendientes>0 
	ORDER BY date(Ventas.siguientePago) DESC');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id_Producto'].'","nombre":"'.$row['nombre'].'","precio":"'.$row['precio'].'","cantidad":"'.$row['cantidad'].'","descripcion":"'.$row['descripcion'].'","pagosPendientes":"'.$row["pagosPendientes"].'","montoPendiente":"'.$row['montoPendiente'].'","montoPorPago":"'.$row["montoPorPago"].'","siguientePago":"'.$row["siguientePago"].'","id_Venta":"'.$row["id_Venta"].'","plazo":"'.$row["plazo"].'","Cliente":"'.$row["Cliente"].'"},';
	$contador++;
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';

if($contador==0)
	$cadena=null;

print_r($cadena);
?>