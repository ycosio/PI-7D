<?php
header('Content-Type: application/json');
if($_GET)
{
$id_Cliente=$_GET['id_Cliente'];
$monto=$_GET['monto'];
$id_Producto=$_GET['id_Producto'];
$plazo=$_GET['plazo'];
$fechaAnterior=$_GET['fechaAnterior'];
$id_Venta=$_GET['id_Venta'];

class MiBD extends SQLite3
{
	function __construct()
	{
		$this->open('PI.db');
	}
}

$bd = new MiBD();

$hoy = split("-", $fechaAnterior);

$mes=$hoy[1];
	switch ($plazo) {
		case '1':
			$dia=((intval($hoy[0])/7)*7)+7;
			if($dia>30)
			{
				$dia=$dia-30;
				$mes=intval($hoy[1])+1;
				if($mes>12);
					$mes=1;
			}
			break;

		case '2':
			$dia=((intval($hoy[0])/15)*15)+15;
			if($dia>30)
			{
				$dia=15;
				$mes=intval($hoy[1])+1;
				if($mes>12);
					$mes=1;
			}
			break;
		
		case '3':
				$mes=intval($hoy[1])+1;
				if($mes>12);
					$mes=1;
				$dia=30;
			break;
	}

	$siguientePago=$dia."-".$mes."-".$hoy[2];
	//echo($siguientePago);
//die;

$cadena='INSERT INTO Abonos(id_Cliente,fecha,monto) VALUES ("'.$id_Cliente.'",(select date("now")),"'.$monto.'")';
//echo $cadena;
$bd->exec($cadena);

$cadena='UPDATE Ventas SET montoPendiente=montoPendiente-' .intval($monto). ' , pagosPendientes=pagosPendientes-1 , siguientePago="'.$siguientePago.'" WHERE id_Cliente='.$id_Cliente.' and id_Producto='.$id_Producto.' and id='.$id_Venta;
//echo $cadena;
$bd->exec($cadena);

/*$resultado = $bd->query('SELECT * FROM cliente');
var_dump($resultado->fetchArray());
*/
print_r('{"estatus":"ok"}');

}

?>