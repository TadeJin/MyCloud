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
    <script type="text/javascript" src = "https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="CSS/stylesheetLogin.css">
    <link rel ="icon" href="media/cloud-solid-120.png">
</head>
<body>
    <div class = "container">
        <div class="header"><h1><img src="media/cloud-black-shape-svgrepo-com.png"> MyCloud</h1></div>
        <div class = "input-box">
            <input type = "name" name = "username" onkeyup="disableBut()" id = "username" placeholder="Username"><br>
        </div>
        <div class="input-box">
            <input type="password" name = "pass" onkeyup="disableBut()" id = "password" placeholder="Password"><br>
        </div>
        <div class="butDiv"><button id = "login" onclick="sendCredentials()" disabled class = "but">Login</button></div>
        <div class="register">Don't have an account ? <a href="createuser">Request one here</a></div>
        <div id = "errorDiv"></div><br>
    </div>

    <script>
        function disableBut() {
            if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
                document.getElementById("login").disabled = false;
            } else {
                document.getElementById("login").disabled = true
            }
        }


        function sendCredentials() {
            $.ajax({
            url: "checkLogin.php",
            type: "POST",
            data: {
                username: document.getElementById("username").value,
                pass: document.getElementById("password").value
            },
            success: function(response) {
                console.log(response)
                if (response == "1") {
                    document.getElementById("errorDiv").innerHTML = "Wrong login credentials!";
                } else if (response == 0) {
                    let date = new Date();
                    if (document.getElementById("username").value != "admin") {
                        newLog(" logged in at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
                    }
                    window.location.href = document.getElementById("username").value == "admin" ? "admin" : "storage";
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
            });
        }

        document.getElementById("username").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (!document.getElementById("login").disabled) {
                    document.getElementById("login").click();
                }
            }
        });

        document.getElementById("password").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (!document.getElementById("login").disabled) {
                    document.getElementById("login").click();
                }
            }
        });
    </script>
    <script src = "Scripts/serverStatusScripts.js"></script>
</body>
</html>
