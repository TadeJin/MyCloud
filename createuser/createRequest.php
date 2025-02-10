<?php 

    session_start();

    if (!empty($_POST["username"]) && !empty($_POST["pass"])) {

        $name = $_POST["username"];

        include("../dbInfo/database.php");
        $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        $connect -> set_charset("UTF8") or die("Kódování nenastaveno");

        $SQL = $connect->prepare("SELECT username FROM user WHERE username = ?");
        $SQL->bind_param("s",$name);
        
        $SQL->execute();

        $result = $SQL->get_result();

        $userRows = $result->num_rows;

        $SQL = $connect->prepare("SELECT username FROM accountRequests WHERE username = ?");
        $SQL->bind_param("s",$name);

        $SQL->execute();

        $result = $SQL->get_result();

        $requestsRows = $result->num_rows;

        if ($userRows + $requestsRows == 0) {
            $SQL = $connect->prepare("INSERT INTO accountRequests(username,password,date) VALUES(?,?,?)");
            $SQL->bind_param("sss",$name,$password,$date);

            $name = $_POST["username"];
            $password = password_hash($_POST["pass"],PASSWORD_DEFAULT);
            $date = date("d-m-Y");
            $SQL->execute();
            $connect->close();
            echo 0;
        } else {
            $connect->close();
            echo 1;
        }
    } else {
        echo "empty";
    }
    