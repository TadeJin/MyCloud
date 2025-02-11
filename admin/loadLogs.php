<?php
    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");


    $result = $connect->query("SELECT logMessage FROM logs");

    $output = "";

    while ($row = $result->fetch_assoc()) {
        $output .= '<p style = "margin-top:0;margin-bottom: 1.5%">' . $row["logMessage"] . '</p>';
    }

    $connect->close();
    echo $output;