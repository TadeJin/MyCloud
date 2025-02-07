<?php
session_start();

if (isset($_POST["name"])) {
    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db);
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
    $SQL = $connect -> prepare("INSERT INTO storagedata(name,isDir,parentDir,user_iduser) VALUES(?,?,?,?)");
    $SQL ->bind_param("sssi", $filename,$isDir,$parentDir,$userid);

    $filename = $_POST["name"];
    $isDir = $_POST["isDir"];
    $parentDir = $_SESSION["currentDir"];
    $userid = $_SESSION["userid"];
    $SQL->execute();

    echo 0;
} else {
    echo 1;
}