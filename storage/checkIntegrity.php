<?php
    session_start();

    include("../dbInfo/database.php");

    if (isset($_SESSION["user"])) {

        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");
        $SQL = $connect->prepare("SELECT name FROM storagedata WHERE user_iduser = ?");
        $SQL->bind_param("i",$userid);

        $userid = $_SESSION["userid"];

        $SQL->execute();

        $result = $SQL->get_result();

        $files = array();


        while($row = $result->fetch_assoc()) {
            array_push($files,$row["name"]);
        }

        $output;

        $path = "/mnt/HDD/" . $_SESSION["user"] . "/";

        $command = "ls " . $path;

        exec($command,$output);

        $corr = 0;

        foreach ($output as $file) {
            if (!in_array($file,$files)) {
                $corr++;
                unlink($path . $file);
            }
        }

        if (file_exists("/var/www/html/storage/downloadedFiles.zip")) {
            unlink("/var/www/html/storage/downloadedFiles.zip");
            $corr++;
        }

        echo $corr . " Corrupted files deleted";
    }