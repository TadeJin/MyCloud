<?php

session_start();

$readyToDelete = array();

function getChildren($folderName) { //Recursively finds all subfolders
    global $readyToDelete;

    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
    $SQL = $connect->prepare("SELECT name,parentDir FROM storageData WHERE parentDir = ? AND user_iduser = ?");
    $SQL->bind_param("ss",$parentDir,$userid);

    $userid = $_SESSION["userid"];
    $parentDir = $folderName;

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
$connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
$connect -> set_charset("UTF8") or die("Kódování nenastaveno");

$SQL = $connect->prepare("DELETE FROM storageData WHERE name = ? AND user_iduser = ?");
$SQL->bind_param("ss",$folderName,$userid);

$folderName = $_POST["folderName"];
$userid = $_SESSION["userid"];
$SQL->execute();


getChildren($_POST["folderName"]);

//Formats subfolder array
$folderArray = array();

foreach($readyToDelete as $file) {
    array_push($folderArray, "'" . $file . "'");
}


//Deltes all subfolders and files in them
$SQL = $connect->prepare("SELECT name,isDir FROM storageData WHERE parentDir IN (" . implode(",",$folderArray) . ") AND user_iduser = ?");
$SQL->bind_param("s",$userid);

$userid = $_SESSION["userid"];
$SQL->execute();

$result = $SQL->get_result();

while($row = $result->fetch_assoc()) {
    if ($row["isDir"] == "1") {
        $SQL = $connect->prepare("DELETE FROM storageData WHERE name = ? AND user_iduser = ?");
        $SQL->bind_param("ss",$folderName,$userid);

        $folderName = $row["name"];
        $userid = $_SESSION["userid"];
        $SQL->execute();
    } else if ($row["isDir"] == "0") {
        unlink($_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["name"]);

        $SQL = $connect->prepare("DELETE FROM storageData WHERE name = ? AND user_iduser = ?");
        $SQL->bind_param("ss",$fileName,$userid);

        $fileName = $row["name"];
        $userid = $_SESSION["userid"];
        $SQL->execute();
    }
}

$connect->close();
echo 0;
