<?php
    session_start();

    if (empty($_SESSION["userid"]) || $_SESSION["user"] != "admin") {
        header ("Location: /");
    }
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
        <title>ADMIN – MyCloud</title>
        <script type="text/javascript" src = "https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <link rel="stylesheet" href = "../CSS/stylesheetAdmin.css">
        <link rel ="icon" href="../media/cloud-solid-120.png">
    </head>
    <body onload="loadUsers(),loadRequests(),loadLogs(),getTemp(),getCpuUsage(),getFreeSpace()">

    <div class = "renameContainer" id = "rebootCheck" hidden>
        <div class = "renameBox">
            <h2>Are you sure you want to reboot ?</h2>
            <button class="backBut" onclick="back()">BACK</button>
            <button class = "submitBut" id = "rebootSub">REBOOT</button>
        </div>
    </div>
    <div class="header">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Capa_1" viewBox="0 0 547.674 547.674" xml:space="preserve">
            <g>
                <g>
                    <path d="M408.737,167.651c-13.348,0.019-26.206,2.032-38.415,5.569c-25.515-42.613-72.026-71.194-125.295-71.114    c-80.54,0.128-145.724,65.521-145.595,146.06c0,1.866,0.214,3.678,0.288,5.526c-1.285-0.049-2.54-0.19-3.837-0.19    C42.846,253.589-0.08,296.648,0,349.685c0.086,53.036,43.146,95.962,96.182,95.883l312.996-0.496    c76.61-0.122,138.612-62.326,138.496-138.931C547.551,229.537,485.348,167.529,408.737,167.651z"/>
                </g>
            </g>
        </svg>
        <h1>MyCloud Admin</h1>

        <div id = "userInfo">
            <div id = "userName"><?php echo $_SESSION["user"]?></div>
            <svg onclick = "toggleProfileInfo()" id = "profilePic" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                width="800px" height="800px" viewBox="0 0 45.532 45.532"
                xml:space="preserve">
                <g>
                    <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765
                        S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53
                        c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012
                        c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592
                        c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"/>
                </g>
            </svg>
            <form method = "post" action = "../storage/logout.php">
                <div id = "profileDropDown" hidden>
                    <svg id = "triangle" name="triangle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" version="1.1" style = "display: none;">
                        <title>triangle-filled</title>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)">
                                <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                    </svg>
                    <ul>
                        <div id = "availableSpaceDiv">Available Space: </div>
                        <div id = "logout"><button type = "submit" name = "logout">Logout<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg></button></div>
                    </ul>
                </div>
            </form>
        </div>
        <hr>
    </div> 
    
    <div class = "adminTools">
        <div class = "infoPanel">
            <div class = "infoPanelHeader">Server info <button class = "rebootBut" onclick = "rebootServer()">&emsp;<div id = "buttonText">REBOOT&emsp;&emsp;</div><img src = "../media/reboot-icon.png" ></button><img src = "../media/server-icon.png"></div>
            <div class = "panelContent">
                <label>STATUS: <label style = "color:green;">ONLINE</label></label>&emsp;&emsp;&emsp;  <br /><br />
                <label>CPU Temperature:</label> <label id = "cpuTemp">0°C</label><br /> <br />
                <label>CPU usage:</label> <label id = "cpuUsage">0%</label><br /><br />
                <label>Available space: </label> <label id = "availableStorage">0 GB</label><br /><br />

                <div class = "tableDiv" name = "logs">
                    <table class = "userTable" name = "logs">
                        <tr>
                            <td colspan = "3" style = "text-align: center;font-size: 1.25vw;outline: 4px solid black;">Logs</td>
                        </tr>

                        <tr>
                            <td id = "logTd">
                                <div class = "logDiv" id = "logDiv"></div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class = "infoPanel">
            <div class = "infoPanelHeader">User info <img src = "../media/user-detail.png" style = "left: 87.5%;width:12.5%;height:auto;top: -16%;"></div>
            <div class = "panelContent">
                <label id = "userCount">Total user count: </label><br /><br />
                <label id = "activeUserCount"></label><br /><br />

                <div style = "margin-left: 5%;outline: 2px solid black;position:relative;">
                    <table class = "userTable" style = "width: 100%;">
                        <tr>
                            <td colspan = "3" style = "text-align: center;font-size: 1.25vw;">User list</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>Taken space</td>
                            <td>Remove</td>
                        </tr>
                    </table>
                </div>

                <div style = "margin-left: 5%;max-height:55vh;min-height:55vh;overflow-y:scroll;overflow-x:hidden;outline: 3px solid black;border-radius: 5px;">
                    <table class = "userTable" id = "usersTable" style = "width: 26.2vw;">
                
                    </table>
                </div>
            </div>
        </div>

        <div class = "infoPanel">
            <div class = "infoPanelHeader">Account requests  <img src = "../media/request-icon.png" style = "width: 8%;height: auto;top: 7.5%;"></div>
            <div class = "panelContent">

            <label id = "requestCount">Total requests: </label><br /><br />
            <label></label><br /><br />
           
            <div class = "tableDiv">

            <div style = "outline: 2px solid black;">
                <table class="userTable">
                    <tr>
                        <td colspan ="4" style = "font-size: 1.25vw;">New requests</td>
                    </tr>

                    <tr>
                        <td>Username</td>
                        <td>Date</td>
                        <td>Accept</td>
                        <td>Decline</td>
                    </tr>
                </table>
            </div>

            <div style = "max-height:55.7vh;min-height:55.7vh;overflow-y:scroll;overflow-x:hidden;outline: 3px solid black;">
                <table class = "userTable" id = "requests" style = "width: 26.2vw;">
            
                </table>
            </div>
            </div>
            </div>
        </div>
    </div>



    <script src="../Scripts/fileDisplayScripts.js"></script>
    <script src="../Scripts/fileManagementScripts.js"></script>
    <script src="../Scripts/fileDisplayScripts.js"></script>
    <script src="../Scripts/startUpScript.js"></script>
    <script src="../Scripts/UIControlScripts.js"></script>
    <script src="../Scripts/uploadScripts.js"></script>
    <script src = "../Scripts/serverStatusScripts.js"></script>

    <script>
        setInterval(getTemp,3000);
        setInterval(getCpuUsage,3000);
        setInterval(getFreeSpace,3000);
        setInterval(loadRequests,3000);
        setInterval(loadLogs,3000);
        function back() {
            document.getElementById("rebootCheck").hidden = true;
        }
    </script>

    </body>
</html>
