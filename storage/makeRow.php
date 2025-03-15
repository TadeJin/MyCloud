<?php
session_start();

if (isset($_POST["name"])) {
    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db);
    $connect -> set_charset("UTF8") or die("Encoding not set");
    $SQL = $connect -> prepare("INSERT INTO storagedata(name,isDir,parentDir,user_iduser) VALUES(?,?,?,?)");
    $SQL ->bind_param("sssi", $filename,$isDir,$parentDir,$userid);

    $filename = htmlspecialchars($_POST["name"]);
    $isDir = htmlspecialchars($_POST["isDir"]);
    $parentDir = htmlspecialchars($_SESSION["currentDir"]);
    $userid = htmlspecialchars($_SESSION["userid"]);
    $SQL->execute();

    echo 0;
} else {
    echo 1;
}