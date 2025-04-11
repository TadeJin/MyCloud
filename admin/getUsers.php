<?php
    function getTakenSpace($dirName) {
        $output = array();
        exec("du -h /mnt/HDD/" . $dirName,$output);

        $output = substr(explode("/",$output[0])[0],0,-1);

        return $output;
    }


    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db) or die("Can't connect to db");
    $connect -> set_charset("UTF8") or die("Encoding not set");


    $result = $connect->query("SELECT iduser,username FROM users WHERE username != 'admin';");

    $htmlOutput = "";

    while ($row = $result -> fetch_assoc()) {
        $htmlOutput .= '
        <tr>
            <td>' . $row["username"] . '</td>
            <td>' . getTakenSpace($row["username"]) . 'B</td>
            <td><a href = "removeUser.php?userid=' . $row["iduser"] . '&username='. $row["username"] . '" id = "">Remove</a></td>
        </tr>';
    }
    
    $connect->close();

    $htmlOutput .= " !" . mysqli_num_rows($result);
    
    echo $htmlOutput;