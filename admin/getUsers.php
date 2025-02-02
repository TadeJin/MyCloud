<?php
    $host = "localhost";
    $user = "root";
    $passwd = "";
    $db = "MyCloud1";

    $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");


    $result = $connect->query("SELECT iduser,username FROM user WHERE username != 'admin';");

    $htmlOutput = 
    
    '<tr>
        <td colspan = "3" style = "text-align: center;font-size: 1.25vw;">User list</td>
    </tr>
    
    <tr>
        <td>Username</td>
        <td>Taken space</td>
        <td>Remove</td>
    </tr>';

    while ($row = $result -> fetch_assoc()) {
        $htmlOutput .= '
        <tr>
            <td>' . $row["username"] . '</td>
            <td> 0 GB</td>
            <td><a href = "removeUser.php?userid=' . $row["iduser"] . '&username='. $row["username"] . '" id = "">Remove</a></td>
        </tr>';
    }
    
    $connect->close();
    
    echo $htmlOutput;