<?php

    session_start();

    include("dbInfo/database.php");

    if (isset($_POST["logMessage"]) && isset($_SESSION["userid"])) {
        
        $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        $connect -> set_charset("UTF8") or die("Kódování nenastaveno");

        $SQL = $connect->query("SELECT * FROM logs");

        $numRows = $SQL->num_rows;

        if ($numRows > 99) {
            $SQL = $connect->query("DELETE FROM logs WHERE idlogs = (SELECT MIN(idlogs) FROM logs)");
        }

        $SQL = $connect->prepare("INSERT INTO logs (createdBy,logMessage) VALUES(?,?)");
        $SQL->bind_param("ss",$userid,$message);

        $userid = $_SESSION["userid"];
        $message = $_POST["logMessage"];

        $SQL->execute();
        $connect->close();
    } else {
        error_log("Variables not set");
    }