<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Ventas.* FROM Ventas');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	$cadena=$cadena.'{"id":"'.$row['id'].'","id_Cliente":"'.$row['id_Cliente'].'","id_Producto":"'.$row['id_Producto'].'","fecha_Compra":"'.$row['fecha_Compra'].'","cantidad":"'.$row['cantidad'].'","total":"'.$row['total'].'","plazo":"'.$row['plazo'].'","montoPorPago":"'.$row['montoPorPago'].'","pagosPendientes":"'.$row['pagosPendientes'].'","montoPendiente":"'.$row['montoPendiente'].'"},';
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';
print_r($cadena);
?>