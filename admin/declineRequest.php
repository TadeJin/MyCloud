<?php
    session_start();


    if ($_SESSION["user"] == "admin") {
        include("../dbInfo/database.php");

        $requestId = (int) $_GET["id"];

        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");


        $SQL = $connect->prepare("DELETE FROM accountrequests WHERE idaccountRequests = ?");
        $SQL->bind_param("i",$requestId);
        $SQL->execute();

        $connect->close();
        header("Location: index.php");
    }