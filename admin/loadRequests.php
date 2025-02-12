<?php
    include("../dbInfo/database.php");

    $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");


    $result = $connect->query("SELECT idaccountRequests,username,date FROM accountRequests");

    $htmlOutput = "";

    while ($row = $result -> fetch_assoc()) {
        $htmlOutput .= '
        <tr>
            <td>' . $row["username"] . '</td>
            <td>' . $row["date"] . '</td>
            <td><a href = "acceptRequest.php?id=' . $row["idaccountRequests"] . '" style = "color:lime;">Accept</a></td>
            <td><a href="declineRequest.php?id=' . $row["idaccountRequests"]. '">Decline</a></td>
        </tr>';
    }

    $connect->close();

    $htmlOutput .= " </tbody>!" . mysqli_num_rows($result);

    echo $htmlOutput;