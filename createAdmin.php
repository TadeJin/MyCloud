<?php

include("dbInfo/database.php");

$connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
$connect -> set_charset("UTF8") or die("Encoding not set");

$SQL = $connect->prepare("INSERT INTO users(username,password) VALUES(?,?)");
$SQL->bind_param("ss",$name,$password);

$name = "admin";
$password = password_hash("16852274",PASSWORD_DEFAULT);
$SQL->execute();


$connect->close();

echo "<p>Created</p>";
