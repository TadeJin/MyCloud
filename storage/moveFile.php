<?php

    session_start();


    if (isset($_SESSION["userid"]) && $_POST["newDir"] != "" && isset($_POST["fileName"])) {

        include("../dbInfo/database.php");

        $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        $connect -> set_charset("UTF8") or die("Kódování nenastaveno");

        $SQL = $connect->prepare("UPDATE storagedata SET parentDir = ? WHERE name = ? AND user_iduser = ? LIMIT 1");
        $SQL->bind_param("ssi",$parentDir,$fileName,$userid);

        $parentDir = $_POST["newDir"];
        $fileName = $_POST["fileName"];
        $userid = $_SESSION["userid"];

        $SQL->execute();
    }
