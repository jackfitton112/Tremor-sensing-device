<?php
//inclides db config page
include "db.php";

$d = file_get_contents('php://input');

$data = json_decode($d);


//defines $x, $y, $z as the variables sent by esp
$x = $data->x;
$y = $data->y;
$z = $data->z;

$x = substr($x, 0, -1);
$y = substr($y, 0, -1);
$z = substr($z, 0, -1);

$x = explode(",", $x);
$y = explode(",", $y);
$z = explode(",", $z);


$i = 0;
while ($i <= count($x)){
  $time = microtime(true);
  $a = $x[$i];
  $s = $y[$i];
  $f = $z[$i];
  $conn->query("INSERT INTO `data` (`id`, `unix`, `x`, `y`, `z`) VALUES ('', '{$time}', '{$a}', '{$s}', '{$f}')");
  $i = $i + 1;
}

?>
