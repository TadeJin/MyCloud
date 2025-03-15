<?php

    session_start();

    if(!empty($_POST["username"]) && !empty($_POST["pass"])) {

        include("dbInfo/database.php");

        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");

        $SQL = $connect->prepare("SELECT iduser,username,password FROM user WHERE username = ?");
        $SQL ->bind_param("s", $user);

        $user = $_POST["username"];
        $SQL->execute();

        $result = $SQL->get_result();
        $row = $result->fetch_assoc();

        if (!empty($row)) {
            if(password_verify($_POST['pass'], $row["password"])) {
                $_SESSION["user"] = $_POST["username"];
                $_SESSION["userid"] = $row["iduser"];
                $_SESSION["currentDir"] = "main";
                $_SESSION["rootPath"] = "C:\\PROJECTS\\MyCloud\\TestStorage\\";
                $connect->close();
                echo 0;
            } else {
                echo 1;
            }
        } else {
            echo 1;
        }
    }
