<?php

    session_start();

    include("../dbInfo/database.php");

    if (isset($_POST["logMessage"]) && isset($_SESSION["userid"])) {
        
        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");

        $SQL = $connect->query("SELECT COUNT(*) as total FROM logs");
        $row = $SQL->fetch_assoc();
    
        if ($row["total"] > 99) {
            $connect->query("DELETE FROM logs WHERE idlogs = (SELECT MIN(idlogs) FROM logs)");
        }

        $SQL = $connect->prepare("INSERT INTO logs (logMessage) VALUES(?)");
        $SQL->bind_param("s",$message);

        $message = htmlspecialchars($_POST["logMessage"]);

        $SQL->execute();
        $connect->close();
    } else {
        error_log("Variables not set");
    }
