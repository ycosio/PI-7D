<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$id=$_GET['id'];
$contador=0;

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Productos.*, Ventas.*, Ventas.id AS id_Venta FROM Productos
	LEFT JOIN Ventas ON Productos.id=Ventas.id_Producto
	LEFT JOIN Cliente ON Ventas.id_cliente=Cliente.id
	WHERE Cliente.id='.$id.' and Ventas.pagosPendientes>0');
$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	/*switch ($row["plazo"]) {
		case '1':
			$dia=((intval($hoy['mday'])/7)*7)+7;
			break;

		case '2':
			$dia=((intval($hoy['mday'])/15)*15)+15;
			if($dia>30)
			{
				$dia=15;
				$mes=intval($hoy['mon'])+1
			}
			break;
		
		default:
				$mes=intval($hoy['mon'])+1
				$dia=30;
			break;
	}

	$siguientePago=$dia."-".$mes."-".$hoy['year'];*/
	$cadena=$cadena.'{"id":"'.$row['id_Producto'].'","nombre":"'.$row['nombre'].'","precio":"'.$row['precio'].'","cantidad":"'.$row['cantidad'].'","descripcion":"'.$row['descripcion'].'","pagosPendientes":"'.$row["pagosPendientes"].'","montoPendiente":"'.$row['montoPendiente'].'","montoPorPago":"'.$row["montoPorPago"].'","siguientePago":"'.$row["siguientePago"].'","id_Venta":"'.$row["id_Venta"].'","plazo":"'.$row["plazo"].'"},';
	$contador++;
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';

if($contador==0)
	$cadena=null;

print_r($cadena);
?>