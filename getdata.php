<?php
//includes db config
include "db.php";

$token = $_GET['token'];

if ($token != "d640914b3434813dd0240cf7d18fdd5d"){
  //stops other groups stealing our dataset
  echo "You are not authorized to access this data, please contact Jack";
  die;
}

//asks db for any row where time is in the past 60 secs
$sql = $conn->query("SELECT * FROM `data` WHERE 1 ORDER BY `id` DESC");

//defines counter as 0, used for array
$counter = 0;

//sets a loop to go through the associative array
while ($r = $sql->fetch_assoc()){

  //defines arrays for the data in the database
  if ($r['x'] == 0 || $r['y'] == 0 || $r['z'] == 0){

  } else{
  $dataX[] = $r['x'];
  $dataY[] = $r['y'];
  $dataZ[] = $r['z'];
  $vals = ($r['x'] * $r['x']) + ($r['y'] * $r['y']) + ($r['z'] * $r['z']);
  $sqrt = sqrt($vals);
  $dataAvg[] = $sqrt;
  $dataTime[] = $counter;
  $counter = $counter + 1;
  }
  //sets a counter to make sure there are only 60 results
  if ($counter > 100){
    break;
  }

}
// sets and array of arrays assoiated to the axsis
$array = array("x" => $dataX, "y" => $dataY, "z" => $dataZ, "avg" => $dataAvg, "count" => $dataTime);

//returns the data as JSON standard
echo json_encode($array);







 ?>
