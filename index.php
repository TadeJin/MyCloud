<?php 
    session_start();
?>
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
    <title>Login – MyCloud</title>
    <link rel="stylesheet" href="CSS/stylesheetLogin.css">
    <link rel ="icon" href="media/cloud-solid-120.png">
</head>
<body>
    <div class = "container">
        <form method="post">
            <div class="header"><h1><img src="media/cloud-black-shape-svgrepo-com.png"> MyCloud</h1></div>
            <div class = "input-box">
                <img src="user-solid-60.png" id = "userImg">
                <input type = "name" name = "username" onkeyup="disableBut()" id = "username" placeholder="Username"><br>
            </div>
            <div class="input-box">
                <img src="lock-solid-60.png" id = "lockImg">
                <input type="password" name = "pass" onkeyup="disableBut()" id = "password" placeholder="Password"><br>
            </div>
            <div class="butDiv"><input type="submit" name = "login" id = "login" disabled value = "Login" class="but"></div>
            <div class="register">Don't have an account ? <a href="createuser">Request one here</a></div>
        </form>
    </div>

    <?php 

        if(isset($_POST["login"]) && !empty($_POST["username"]) && !empty($_POST["pass"])) {
            $host = "localhost";
            $user = "root";
            $passwd = "";
            $db = "MyCloud1";

            $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
            $connect -> set_charset("UTF8") or die("Kódování nenastaveno");

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
                    $_POST["username"] != "admin" ? header("Location: storage") : header("Location: admin");
                }
            }
        }
    ?>

    <script>
        disableBut = () => {
            if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
                document.getElementById("login").disabled = false;
            } else {
                document.getElementById("login").disabled = true
            }
        }
    </script>
</body>
</html>
