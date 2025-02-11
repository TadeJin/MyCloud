<?php 

    session_start();

    if (isset($_SESSION["userid"])) {

        include("../dbInfo/database.php");

        $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        $connect -> set_charset("UTF8") or die("Kódování nenastaveno");

        $SQL = $connect->prepare("SELECT name FROM storagedata WHERE user_iduser = ? AND isDir = 1 AND name != ? GROUP BY name");
        $SQL->bind_param("is",$userid,$fileName);

        $userid = $_SESSION["userid"];
        $fileName = $_POST["fileName"];

        $SQL->execute();

        $result = $SQL->get_result();

        $output = '<option value = "main">main</option>';

        while ($row = $result->fetch_assoc()) {
            $output .= '<option value = "'. $row["name"] .'">' . $row["name"] . '</option>';
        }
        $connect->close();

        echo $output;
    }