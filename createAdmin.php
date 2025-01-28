<?php

$host = "localhost";
$user = "root";
$passwd = "";
$db = "MyCloud1";

$connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
$connect -> set_charset("UTF8") or die("Kódování nenastaveno");

$SQL = $connect->prepare("INSERT INTO user(username,password) VALUES(?,?)");
$SQL->bind_param("ss",$name,$password);

$name = "admin";
$password = password_hash("2268516",PASSWORD_DEFAULT);
$SQL->execute();

$result = $SQL->get_result();
$row = $result->fetch_assoc();

$connect->close();

echo "<p>Created</p>";