<?php
session_start();

include("../dbInfo/database.php");

$connect = new mysqli($host, $user, $passwd, $db);
$connect -> set_charset("UTF8") or die("Encoding not set");

$SQL = $connect->prepare("SELECT name FROM storagedata WHERE name = ? AND user_iduser = ?");
$SQL ->bind_param("ss", $filename,$userid);

$filename = htmlspecialchars($_POST["filename"]);
$userid = htmlspecialchars($_SESSION["userid"]);
$SQL->execute();

$result = $SQL->get_result();
$num = $result->num_rows;

if ($num == 0) {
    echo 1;
} else {
    echo 0;
}
$connect->close();
