<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$id=$_GET['id'];

$bd = new SQLite3('PI.db'); 
$results = $bd->query('SELECT Ventas.* FROM Ventas 
	LEFT JOIN Cliente ON Ventas.id_Cliente=Cliente.id_Cliente
	LEFT JOIN Vendedor ON Cliente.id_vendedor=Vendedor.id
	WHERE Vendedor.id='$id);

$hoy = getdate();

/*$cadena='{"records":[';
while ($row = $results->fetchArray()) {
	switch ($row["plazo"]) {
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

	$cadena=$cadena.'{"id":"'.$row['id'].'","id_Cliente":"'.$row['id_Cliente'].'","id_Producto":"'.$row['id_Producto'].'","fecha_Compra":"'.$row['fecha_Compra'].'","cantidad":"'.$row['cantidad'].'","total":"'.$row['total'].'","plazo":"'.$row['plazo'].'","montoPorPago":"'.$row['montoPorPago'].'","pagosPendientes":"'.$row['pagosPendientes'].'","montoPendiente":"'.$row['montoPendiente'].'","siguientePago":"'.$siguientePago.'"},';
}
$cadena=substr($cadena,0,-1);
$cadena=$cadena.']}';
print_r($cadena);
?>