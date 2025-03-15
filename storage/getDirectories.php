<?php 

    session_start();

    if (isset($_SESSION["userid"])) {

        include("../dbInfo/database.php");

        $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
        $connect -> set_charset("UTF8") or die("Encoding not set");

        $SQL = $connect->prepare("SELECT name FROM storagedata WHERE user_iduser = ? AND isDir = 1 AND name != ? GROUP BY name ORDER BY name");
        $SQL->bind_param("is",$userid,$fileName);

        $userid = htmlspecialchars($_SESSION["userid"]);
        $fileName = htmlspecialchars($_POST["fileName"]);

        $SQL->execute();

        $result = $SQL->get_result();

        $output = '<option value = "main">main</option>';

        while ($row = $result->fetch_assoc()) {
            $output .= '<option value = "'. htmlspecialchars($row["name"]) .'">' . htmlspecialchars($row["name"]) . '</option>';
        }
        $connect->close();

        echo $output;
    }
