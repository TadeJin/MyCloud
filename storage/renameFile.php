<?php
session_start();

$newName = $_POST["newFileName"] . substr($_POST["oldFileName"],strrpos($_POST["oldFileName"],"."));
$newName = htmlspecialchars($newName);
$filePath = $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $newName;
rename($_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_POST["oldFileName"],$filePath);
$host = "localhost";
$user = "root";
$passwd = "";
$db = "MyCloud";

$connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
$connect -> set_charset("UTF8") or die("Kódování nenastaveno");

$SQL = $connect->prepare("UPDATE files SET filename = ? WHERE filename = ? AND user_iduser = ?");
$SQL->bind_param("ssi", $newName,$_POST["oldFileName"],$_SESSION["userid"]);

$SQL->execute();

echo $newName;
