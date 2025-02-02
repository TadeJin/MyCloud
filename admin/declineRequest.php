<?php
    session_start();


    if ($_SESSION["user"] == "admin") {
        $host = "localhost";
        $user = "root";
        $passwd = "";
        $db = "MyCloud1";

        $requestId = (int) $_GET["id"];

        $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        $connect -> set_charset("UTF8") or die("Kódování nenastaveno");


        $SQL = $connect->prepare("DELETE FROM accountRequests WHERE idaccountRequests = ?");
        $SQL->bind_param("i",$requestId);
        $SQL->execute();

        $connect->close();
        header("Location: index.php");
    }