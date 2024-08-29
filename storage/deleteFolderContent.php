<?php

session_start();

$host = "localhost";
$user = "root";
$passwd = "";
$db = "MyCloud1";

$connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
$connect -> set_charset("UTF8") or die("Kódování nenastaveno");

$SQL = $connect->prepare("SELECT name FROM storageData WHERE user_iduser = ? AND parentDir = ?");
$SQL ->bind_param("ss", $userid,$parentDir);

$userid = $_SESSION["userid"];
$parentDir = $_POST["folderName"];
$SQL -> execute();

$result = $SQL->get_result();

$filenames = [];
while ($row = $result -> fetch_assoc()) {
    array_push($filenames,$row["name"]);
}

foreach ($filenames as $file) {
    $SQL = $connect->prepare("DELETE FROM storagedata WHERE name = ? AND user_iduser = ? AND parentDir = ?");
    $SQL ->bind_param("sss", $file, $userid, $parentDir);

    $name = $file;
    $userid = $_SESSION["userid"];
    $parentDir = $_POST["folderName"];
    $SQL -> execute();
}

$SQL = $connect->prepare("DELETE FROM storagedata WHERE name = ? AND user_iduser = ? AND parentDir = ?");
$SQL ->bind_param("sis", $name, $userid, $parentDir);

$name = $_POST["folderName"];
$userid = $_SESSION["userid"];
$parentDir = $_SESSION["currentDir"];

$SQL -> execute();
$connect->close();
echo 0;