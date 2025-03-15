<?php
session_start();

if (file_exists($_SESSION["rootPath"] . $_SESSION["user"] . "/" . htmlspecialchars($_POST["fileName"]))) {
	unlink($_SESSION["rootPath"] . $_SESSION["user"] . "/" . htmlspecialchars($_POST["fileName"]));
	echo 0;
} else {
	echo -1;
}

include("../dbInfo/database.php");

$connect1 = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
$connect1 -> set_charset("UTF8") or die("Encoding not set");
$SQL1 = $connect1->prepare("DELETE FROM storagedata WHERE name = ? AND user_iduser = ?");
$SQL1->bind_param("si",$fileName,$userid);

$fileName = htmlspecialchars($_POST["fileName"]);
$userid = htmlspecialchars($_SESSION["userid"]);

$SQL1->execute();
$connect1->close();

