<!--                                                                                                                    
  __  __          _____  _                    _        
 |  \/  |        / ____|| |                  | |         
 | \  / | _   _ | |     | |  ___   _   _   __| |       
 | |\/| || | | || |     | | / _ \ | | | | / _` |       
 | |  | || |_| || |____ | || (_) || |_| || (_| |      
 |_|  |_| \__, | \_____||_| \___/  \__,_| \__,_|           
           __/ |                                                                       
          |___/                                                  
 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create User</title>
    <link rel="stylesheet" href="../CSS/stylesheetCreateUser.css">
    <link rel ="icon" href="../media/cloud-solid-120.png">
</head>
<body>
    <div class="container">
        <form method="post">
            <div class="header"><h1><img src="../media/cloud-black-shape-svgrepo-com.png"> Create User</h1></div>
            <div class="input-box">
                <img src="../media/user-solid-60.png" id = "userImg">
                <input type = "name" name = "username" placeholder="Username" onkeyup="disableBut()" id = "username">
            </div>
            <div class="input-box">
                <img src="../media/lock-solid-60.png" id="pass">
                <input type="password" name = "password" placeholder="Password" onkeyup="disableBut()" id = "password">
            </div>
            <div class="input-box">
                <img src="../media/lock-solid-60.png" id="admin">
                <input type = "password" name = "adminPassword" placeholder="Admin password" onkeyup="disableBut()" id = "adminPass">
            </div>
            <div class="butDiv">
                <input type="submit" name = "add" id = "add" disabled value = "Create User" class = "but"><br>
                <button type = "submit" name = "back">Back</button>
            </div>
        </form>
    </div>
    
    <script>
        disableBut = () => {
            if (document.getElementById("username").value != "" && document.getElementById("password").value != "" && document.getElementById("adminPass").value != "") {
                document.getElementById("add").disabled = false;
            } else {
                document.getElementById("add").disabled = true
            }
    }
    </script>

    <?php 
        if (isset($_POST["back"])) {
            header("Location: /MyCloud");
        }
    
        // if (isset($_POST["add"])) {
        //     if (!empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["adminPassword"]) && $_POST["adminPassword"] != "admin" ) {
        //         $host = "localhost";
        //         $user = "root";
        //         $passwd = "";
        //         $db = "MyCloud1";
                
        //         $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        //         $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
                
        //         $SQL = $connect->prepare("SELECT username,password FROM user WHERE username = ?");
        //         $SQL->bind_param("s",$name);
                
        //         $name = "admin";
        //         $SQL->execute();
                
        //         $result = $SQL->get_result();
        //         $row = $result->fetch_assoc();
                
        //         $connect->close();
                
        //         if (password_verify($_POST["adminPassword"],$row["password"])) { 
        //             $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
        //             $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
        //             $SQL = $connect->prepare("INSERT INTO user(username,password) VALUES (?,?)");
        //             $SQL-> bind_param("ss",$user,$password);

        //             $user = $_POST["username"];
        //             $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
        //             $SQL->execute();

        //             $connect->close();
        //             mkdir("C:\\PROJECTS\\MyCloud\\TestStorage\\" . $_POST["username"]);
        //             header("Location: /MyCloud");
        //         }
        //     }
        // }

        if(isset($_POST["add"])) {
            if (!empty($_POST["username"]) && !empty($_POST["password"])) {
                $host = "localhost";
                $user = "root";
                $passwd = "";
                $db = "MyCloud1";

                $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
                $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
                $SQL = $connect->prepare("INSERT INTO accountRequests(username,password,date) VALUES (?,?,?)");
                $SQL-> bind_param("sss",$user,$password,$date);

                $user = $_POST["username"];
                $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
                $date = date("d-m-Y");
                $SQL->execute();

                $connect->close();

                
            }
        }
    ?>
</body>
</html>
