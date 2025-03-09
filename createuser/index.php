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
    <script type="text/javascript" src = "https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="../CSS/stylesheetCreateUser.css">
    <link rel ="icon" href="../media/cloud-solid-120.png">
</head>
<body>
    <div class="container">
        <div class="header"><h1><img src="../media/cloud-black-shape-svgrepo-com.png"> Create User</h1></div>

        <div class="input-box">
            <img src="../media/user-solid-60.png" id = "userImg">
            <input type = "name" placeholder="Username" onkeyup="disableBut()" id = "username">
        </div>

        <div class="input-box">
            <img src="../media/lock-solid-60.png" id="pass">
            <input type="password" placeholder="Password" onkeyup="disableBut()" id = "password">
        </div>
        
        <div class="butDiv">
            <button id = "submitBut" disabled onclick = "submitRequest()">Submit</button><br>
            <button id = "back" onclick="goBack()">Back</button>
        </div><br><br><br><br><br><br><br>

        <div class="register" id = "reg">Once your account is approved you will be able to log in.</div>
        <div class = "loginErrorDisplay" id = "errorDiv"></div>
    </div>
    
    <script>
        function disableBut() {
            if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
                document.getElementById("submitBut").disabled = false;
            } else {
                document.getElementById("submitBut").disabled = true
            }
        }

        function goBack() {
            window.location.href = "/MyCloud";
        }

        function submitRequest() {
            $.ajax({
            url: "createRequest.php",
            type: "POST",
            data: {
                username: document.getElementById("username").value,
                pass: document.getElementById("password").value
            },
            success: function(response) {
                console.log(response)
                if (response == "1") {
                    document.getElementById("errorDiv").innerHTML = "Account with this name already exists!";
                } else if (response == 0) {
                    window.location.href = "/MyCloud";
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
                if (!document.getElementById("submitBut").disabled) {
                    document.getElementById("submitBut").click();
                }
            }
        });

        document.getElementById("password").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (!document.getElementById("submitBut").disabled) {
                    document.getElementById("submitBut").click();
                }
            }
        });
    </script>
</body>
</html>
