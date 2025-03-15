<?php

include("../dbInfo/database.php");
session_start();

$connect = new mysqli($host, $user, $passwd, $db);
$connect -> set_charset("UTF8") or die("Encoding not set");

$SQL = $connect->prepare("SELECT parentDir FROM storagedata WHERE name = ? AND user_iduser = ?");
$SQL ->bind_param("ss", $filename,$userid);

$filename = htmlspecialchars($_POST["currentDir"]);
$userid = htmlspecialchars($_SESSION["userid"]);
$SQL->execute();

$result = $SQL->get_result();
$row = $result->fetch_assoc();

echo $row["parentDir"];