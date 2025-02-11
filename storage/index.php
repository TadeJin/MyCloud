<?php
    session_start(); 
    
    if (empty($_SESSION["userid"])) {
        header ("Location: /MyCloud");
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
    <title>Storage – MyCloud</title>
    <script type="text/javascript" src = "https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href = "../CSS/stylesheetStorage.css">
    <link rel ="icon" href="../media/cloud-solid-120.png">
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

    <div class = "renameContainer" id = "newFolderContainer" hidden>
        <div class = "renameBox">
            <h2>Enter folder name:</h2>
            <input type="text" class = "newNameInput" id = "newFolderName"><br>
            <button class="backBut" onclick="back()">BACK</button>
            <button class = "submitBut" id = "newFolderSub">SUBMIT</button>
        </div>
    </div>

    <div class = "renameContainer" id = "folderDelete" hidden>
        <div class = "renameBox">
            <h2 id = "folderDeleteWarningHeader">Are you sure you want to delete and its contents ?</h2>
            <p>This action cannot be undone!</p>
            <button class="backBut" onclick="back()">CANCEL</button>
            <button class = "submitBut" id = "folderDelteSub">YES</button>
        </div>
    </div>

    <div class = "renameContainer" id = "fileDelete" hidden>
        <div class = "renameBox">
            <h2 id = "fileDeleteWarningHeader">Are you sure you want to delete ?</h2>
            <p>This action cannot be undone!</p>
            <button class="backBut" onclick="back()">CANCEL</button>
            <button class = "submitBut" id = "fileDelteSub">YES</button>
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
        <h1>MyCloud Storage</h1>
        <div id = "currentFolderDiv">Directory: Main folder</div>
        <!--<div class="Space">
            <h2>Available storage: </h2>
            <h2 id = "storage"></h2>
        </div>
        <div id = "temp">0.00°C</div>
        <div id = "serverText">SERVER TEMPERATURE:</div>-->
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
            <form method = "post" action = "logout.php">
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
                        <div id = "takenSpaceDiv">Taken Space: </div>
                        <div id = "logout"><button type = "submit" name = "logout">Logout<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg></button></div>
                    </ul>
                </div>
            </form>
        </div>
        <hr>
    </div> 
    
    <div class="tools">
        <input id = "file-input" type="file" name ="file" multiple>
        
        <div id = "returnToMain" title = "Return to main folder" style="display:none" onclick="openPreviousFolder()">
            <svg id = "returnToMainIcon"xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
        </div>
        
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
        
        <div id = "toolsWrapper">
            <h2 id = "filesHeader">Your files: </h2>
            <div id = "fileUploadBut" title = "Upload File" onclick="document.getElementById('file-input').click()">
                <svg id = "fileUploadButIcon" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            </div>
            <div id = "createFolderBut" title = "Create Folder">
                <svg id = "createFolderButSvg" xmlns="http://www.w3.org/2000/svg" width="70%" height= "70%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-4 9h-3v3h-2v-3H8v-2h3V9h2v3h3v2z"></path></svg>
            </div>
        </div>
    </div>

    <div class = "searchBarWrapper">
            <div id = "searchBarDiv"><input id = "searchBar" onkeyup="loadFiles(addEventListenersToFiles)" placeholder="Search..."><div id = "searchbarIcon" onclick = "loadFiles(addEventListenersToFiles)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: gray;transform: ;msFilter:;"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg></div></div>
    </div>

    <div class = "multipleFileManagementWrapper">
        <input type="hidden" id = "selectedFiles" value = "">
        

        <div id = "downloadMultiple" title = "Download selected files" style = "display:none;" onclick = "downloadSelected()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>
        </div>

        <div id = "deleteMultiple" title = "Delete selected files" style = "display:none;" onclick="deleteSelected()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
        </div>

        <div id = "mutipleFileControl" title = "Select files" onclick = "selectFiles()">
            <input type="hidden" id = "mutipleFileControlValue" value = "0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zm8.933 3.519-1.726-1.726-1.414 1.414 3.274 3.274 5.702-6.84-1.538-1.282z"></path></svg>
        </div>
    </div>

    <div id = "fileDisplayDiv"></div>

    <div id = "noFilesDisplay">
        <div>No files uploaded</div>
    </div>


    <!-- <script type="text/javascript" src = "../Scripts/script.js"></script> -->
     
    <script src="../Scripts/fileDisplayScripts.js"></script>
    <script src="../Scripts/fileManagementScripts.js"></script>
    <script src="../Scripts/fileDisplayScripts.js"></script>
    <script src="../Scripts/startUpScript.js"></script>
    <script src="../Scripts/UIControlScripts.js"></script>
    <script src="../Scripts/uploadScripts.js"></script>
    <script src = "../Scripts/serverStatusScripts.js"></script>
</body>
</html>
