<?php
session_start();



include("../dbInfo/database.php");

$connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
$connect -> set_charset("UTF8") or die("Kódování nenastaveno");
$SQL = $connect->prepare("SELECT isDir FROM storageData WHERE name = ? AND user_iduser = ?");
$SQL->bind_param("si",$_POST["oldFileName"],$_SESSION["userid"]);
$SQL->execute();

$result = $SQL->get_result();

$result = $result ->fetch_assoc();

if ($result["isDir"] == 0) {
    $newName = $_POST["newFileName"] . substr($_POST["oldFileName"],strrpos($_POST["oldFileName"],"."));
    $newName = htmlspecialchars($newName);
    $filePath = $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $newName;
    rename($_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_POST["oldFileName"],$filePath);
} else {
    $newName = $_POST["newFileName"];
    $SQL0 = $connect->prepare("UPDATE storagedata SET parentDir = ? WHERE parentDir = ? AND user_iduser = ?");
    $SQL0->bind_param("ssi", $newName,$_POST["oldFileName"],$_SESSION["userid"]);
    $SQL0->execute();
}

$SQL = $connect->prepare("UPDATE storagedata SET name = ? WHERE name = ? AND user_iduser = ?");
$SQL->bind_param("ssi", $newName,$_POST["oldFileName"],$_SESSION["userid"]);

$SQL->execute();

echo $newName;
