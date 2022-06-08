<?php

//defines database variables
$servername = "localhost";
$username = "clockr_med";
$password = "=TsFyq2xjJ%E";
$db = "clockr_med";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  //retuns the relevemt error if one occurs (very unlikely)
    die("Connection failed: " . $conn->connect_error);
  } else {
  echo "";
  };



 ?>
