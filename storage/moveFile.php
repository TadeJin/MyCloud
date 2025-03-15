<?php

    session_start();


    if (isset($_SESSION["userid"]) && $_POST["newDir"] != "" && isset($_POST["fileName"])) {

        include("../dbInfo/database.php");

        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");

        $SQL = $connect->prepare("UPDATE storagedata SET parentDir = ? WHERE name = ? AND user_iduser = ? LIMIT 1");
        $SQL->bind_param("ssi",$parentDir,$fileName,$userid);

        $parentDir = htmlspecialchars($_POST["newDir"]);
        $fileName = htmlspecialchars($_POST["fileName"]);
        $userid = htmlspecialchars($_SESSION["userid"]);

        $SQL->execute();
    }
