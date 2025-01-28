<?php
    session_start();
    $host = "localhost";
    $user = "root";
    $passwd = "";
    $db = "MyCloud1";

    $connect1 = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect1 -> set_charset("UTF8") or die("Kódování nenastaveno");
    $SQL1 = $connect1->prepare("DELETE FROM user WHERE username = ?");
    $SQL1->bind_param("s",$username);

    $username = $_GET["username"];

    $SQL1->execute();
    $connect1->close();

    header("Location: index.php");