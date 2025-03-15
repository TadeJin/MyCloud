<?php
    session_start();


    if ($_SESSION["user"] == "admin") {
        include("../dbInfo/database.php");

        $requestId = (int) $_GET["id"];

        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");

        $SQL1 = $connect->prepare("SELECT username,password FROM accountrequests WHERE idaccountRequests = ?");
        $SQL1->bind_param("i",$requestId);
        $SQL1->execute();

        $result = $SQL1->get_result();
        $row = $result->fetch_assoc();


        $SQL2 = $connect->prepare("INSERT INTO user(username,password) VALUES(?,?)");
        $SQL2->bind_param("ss",$name,$password);

        $name = $row["username"];
        $password = $row["password"];
        $SQL2->execute();

        mkdir($_SESSION["rootPath"] . $row["username"]);

        $SQL3 = $connect->prepare("DELETE FROM accountrequests WHERE idaccountRequests = ?");
        $SQL3->bind_param("i",$requestId);
        $SQL3->execute();

        $connect->close();
        header("Location: index.php");
    }
