<?php
    session_start();
    include("../dbInfo/database.php");

    $userid = (int) $_GET["userid"];

    $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
    
    $SQL1 = $connect->prepare("DELETE FROM storagedata WHERE user_iduser = ?");
    $SQL1->bind_param("i", $userid);

    $SQL1->execute();
    
    
    $SQL2 = $connect->prepare("DELETE FROM user WHERE iduser = ?");
    $SQL2->bind_param("i",$userid);

    $SQL2->execute();

    $connect->close();

    $files = scandir($_SESSION["rootPath"] . $_GET["username"]);
    var_dump($files);

    foreach($files as $file) {
        unlink($_SESSION["rootPath"] . $_GET["username"] . "\\" . $file);
    }

    rmdir($_SESSION["rootPath"] . $_GET["username"]);

    header("Location: index.php");