<?php

session_start();

$readyToDelete = array();

function getChildren($folderName) { //Recursively finds all subfolders
    global $readyToDelete;

    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
    $connect -> set_charset("UTF8") or die("Encoding not set");
    $SQL = $connect->prepare("SELECT name,parentDir FROM storagedata WHERE parentDir = ? AND user_iduser = ?");
    $SQL->bind_param("ss",$parentDir,$userid);

    $userid = htmlspecialchars($_SESSION["userid"]);
    $parentDir = htmlspecialchars($folderName);

    $SQL->execute();

    $result = $SQL->get_result();

    if ($result->num_rows > 0)  {
        array_push($readyToDelete, $folderName);
        while ($row = $result->fetch_assoc()) {
            getChildren($row["name"]);
        }
    } else {
        array_push($readyToDelete, $folderName);
    }
}


include("../dbInfo/database.php");

// Deletes top parent folder
$connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
$connect -> set_charset("UTF8") or die("Encoding not set");

$SQL = $connect->prepare("DELETE FROM storagedata WHERE name = ? AND user_iduser = ?");
$SQL->bind_param("ss",$folderName,$userid);

$folderName = htmlspecialchars($_POST["folderName"]);
$userid = htmlspecialchars($_SESSION["userid"]);
$SQL->execute();


getChildren($_POST["folderName"]);

//Formats subfolder array
$folderArray = array();

foreach($readyToDelete as $file) {
    array_push($folderArray, "'" . $file . "'");
}


//Deltes all subfolders and files in them
$SQL = $connect->prepare("SELECT name,isDir FROM storagedata WHERE parentDir IN (" . implode(",",$folderArray) . ") AND user_iduser = ?");
$SQL->bind_param("s",$userid);

$userid = $_SESSION["userid"];
$SQL->execute();

$result = $SQL->get_result();

while($row = $result->fetch_assoc()) {
    if ($row["isDir"] == "1") {
        $SQL = $connect->prepare("DELETE FROM storagedata WHERE name = ? AND user_iduser = ?");
        $SQL->bind_param("ss",$folderName,$userid);

        $folderName = htmlspecialchars($row["name"]);
        $userid = htmlspecialchars($_SESSION["userid"]);
        $SQL->execute();
    } else if ($row["isDir"] == "0") {
        unlink($_SESSION["rootPath"] . $_SESSION["user"] . "/" . htmlspecialchars($row["name"]));

        $SQL = $connect->prepare("DELETE FROM storagedata WHERE name = ? AND user_iduser = ?");
        $SQL->bind_param("ss",$fileName,$userid);

        $fileName = htmlspecialchars($row["name"]);
        $userid = htmlspecialchars($_SESSION["userid"]);
        $SQL->execute();
    }
}

$connect->close();
echo 0;
