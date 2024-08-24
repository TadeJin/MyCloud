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
    <title>Storage – MyCloud</title>
    <script type="text/javascript" src = "https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href = "stylesheetStorage.css">
    <link rel ="icon" href="cloud-solid-120.png">
</head>
<body>
    
    <div class = "renameContainer" id = "renameContainer" hidden>
        <div class = "renameBox">
            <h2>Enter new file name:</h2>
            <input type="text" class = "newNameInput" id = "newFileNameInput"><br>
            <button class="backBut" onclick="back()">BACK</button>
            <button class = "submitBut" id = "renameSub">SUBMIT</button>
        </div>
    </div>
    
    <div class="header">
        <h1><img src="cloud-black-shape-svgrepo-com.png"> MyCloud Storage</h1>
        <div class="Space">
            <h2>Available storage: </h2>
            <h2 id = "storage"></h2>
        </div>
        <div id = "temp">0.00°C</div>
        <div id = "serverText">SERVER TEMPERATURE:</div>
        <form method = "post">
            <button type = "submit" name = "logout">Logout</button>
        </form>
        <hr>
    </div> 
    
    <div class="tools">
        <input id = "file-input" type="file" name ="file" multiple>
        
        <div id = "uploadStatusWrapper">
            <div id = "uploadStatusBox">
                <div id = "uploadText">Uploading Files</div>
                <div id = "dots">...</div>
                <div id = "currentFileUploading">Current file: </div>
                <div id = "filesUploaded">Uploaded: 0/4 files</div>
                <div id = "percentage">0%</div>
                <progress id = "progress" value="0" max = "100"></progress>

                <div id = "cancelUpload">Cancel Upload</div>
                <div id = "hideUploadStatus">
                    <svg id = "statusArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                </div>
            </div>
        </div>

        <div id = "statusBoxWrapper">
            <div id = "statusBox">
                <div id = "statusHeaderText"></div>
                <div id = "statusIcon"></div>
                
                <div id = "statusText"></div>
                <div id = "hideStatusBox">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
        </div>
        
        <div>
            <h2 id = "filesHeader">Your files:</h2>
            <div id = "fileUploadBut" title = "Upload File" onclick="document.getElementById('file-input').click()">
                <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            </div>
        </div>
    </div>
    <div id = "fileDisplayDiv"></div>

    <?php 
        if (empty($_SESSION["userid"])) {
            header ("Location:/MyCloud");
        }
        
        if (isset($_POST["logout"])) {
            session_destroy();
            header("Location: /MyCloud");
        }?>
    <script type="text/javascript" src = "script.js"></script>
</body>
</html>
