<?php
session_start();

$host = "localhost";
$user = "root";
$passwd = "";
$db = "MyCloud";

$connect = new mysqli($host, $user, $passwd, $db);
$connect -> set_charset("UTF8") or die("Kódování nenastaveno");
$SQL = $connect -> prepare("INSERT INTO files(filename,user_iduser) VALUES(?,?)");
$SQL ->bind_param("ss", $filename,$userid);

$filename = $_POST["fileName"];
$userid = $_SESSION["userid"];
$SQL->execute();
