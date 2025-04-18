function dotsAnim(num) {
    document.getElementById("dots").innerHTML = ".".repeat((num % 4));
    num++;
    setTimeout(() => {dotsAnim(num)},1000);
}


function back() {
    document.getElementById("renameContainer").hidden = true;
    document.getElementById("newFolderContainer").hidden = true;
    document.getElementById("folderDelete").hidden = true;
    document.getElementById("fileDelete").hidden = true;
    document.getElementById("moveContainer").hidden = true;
    document.getElementById("forbiddenCharCheckFolder").style.display = "none";
    document.getElementById("forbiddenCharCheckRename").style.display = "none";

    //Removes old EL from rename in order to not rename old files
    let old_element = document.getElementById("renameSub");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}


function displayError(errorText) {
    if (window.innerWidth > 600) {
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(120%)" }
            ],
                            
            {
                duration: 0,
                iterations: 1,
                fill: "forwards",
            }
            );
        document.getElementById("statusHeaderText").innerHTML = "Error";
        document.getElementById("statusHeaderText").style = "color: red;";
        document.getElementById("statusIcon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(255, 0, 0, 1);transform: ;msFilter:;"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>';
        document.getElementById("statusIcon").style = " left: 11%;";
        document.getElementById("statusText").innerHTML = errorText;
        document.getElementById("statusText").style = "font-size: 1vw";
        
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(0%)" }
            ],
                            
           {
                duration: 250,
                iterations: 1,
                fill: "forwards",
           }
          );

        setTimeout(() => {
            document.getElementById("statusBoxWrapper").animate(
                [
                    { transform: "translateX(120%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
        },5000);
    } else {
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(120%)" }
            ],
                            
            {
                duration: 0,
                iterations: 1,
                fill: "forwards",
            }
            );
        document.getElementById("statusHeaderText").innerHTML = "Error";
        document.getElementById("statusHeaderText").style = "color: red;";
        document.getElementById("statusIcon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(255, 0, 0, 1);transform: ;msFilter:;"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>';
        document.getElementById("statusIcon").style = " left: 11%;";
        document.getElementById("statusText").innerHTML = errorText;
        // document.getElementById("statusText").style = "font-size: 1vw";
        
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(-50%)" }
            ],
                            
        {
                duration: 250,
                iterations: 1,
                fill: "forwards",
        }
        );

        setTimeout(() => {
            document.getElementById("statusBoxWrapper").animate(
                [
                    { transform: "translateX(120%)" }
                ],
                                
            {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
            }
            );
        },5000);
    }
}

function displaySuccess(successText) {
    if (window.innerWidth > 600) {
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(120%)" }
            ],
                            
            {
                duration: 0,
                iterations: 1,
                fill: "forwards",
            }
            );
        document.getElementById("statusHeaderText").innerHTML = "Success";
        document.getElementById("statusHeaderText").style = "color: green;";
        document.getElementById("statusIcon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="green" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        document.getElementById("statusIcon").style = "left: 16%;";
        document.getElementById("statusText").innerHTML = successText;
        //document.getElementById("statusText").style = "font-size: 1.2vw";
        
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(0%)" }
            ],
                            
           {
                duration: 250,
                iterations: 1,
                fill: "forwards",
           }
          );

        setTimeout(() => {
            document.getElementById("statusBoxWrapper").animate(
                [
                    { transform: "translateX(120%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
        },5000);
    } else {
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(120%)" }
            ],
                            
            {
                duration: 0,
                iterations: 1,
                fill: "forwards",
            }
            );
        document.getElementById("statusHeaderText").innerHTML = "Success";
        document.getElementById("statusHeaderText").style = "color: green;";
        document.getElementById("statusIcon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        document.getElementById("statusIcon").style = "left: 16%;";
        document.getElementById("statusText").innerHTML = successText;
        // document.getElementById("statusText").style = "font-size: 1.2vw";
        
        document.getElementById("statusBoxWrapper").animate(
            [
                { transform: "translateX(-50%)" }
            ],
                            
        {
                duration: 250,
                iterations: 1,
                fill: "forwards",
        }
        );

        setTimeout(() => {
            document.getElementById("statusBoxWrapper").animate(
                [
                    { transform: "translateX(120%)" }
                ],
                                
            {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
            }
            );
        },5000);
    }
}

function showUploadStatus(completely) {
    if (window.innerWidth > 600) {
        if (completely) {
            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(0%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );

              document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(180deg)" }
                ],
                                
                {
                    duration: 0,
                    iterations: 1,
                    fill: "forwards",
                }
            );
        } else {
            document.getElementById('uploadText').hidden = false;
            document.getElementById('dots').hidden = false;
            document.getElementById("currentFileUploading").hidden = false;
            document.getElementById("filesUploaded").hidden = false;
            document.getElementById("percentage").hidden = false;
            document.getElementById('progress').hidden = false;
            document.getElementById("cancelUpload").style = "display:flex";
            document.getElementById("hideUploadStatus").style = "width: 8%;left: 92%";

            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(180deg)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("uploadStatusBox").animate(
                [
                    {width: "10%"},
                    {width: "100%"}
                ],

                {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(0%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
        }
    } else {
        if (completely) {
            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(-10%)" }
                ],
                                
            {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
            }
            );

            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(180deg)" }
                ],
                                
                {
                    duration: 0,
                    iterations: 1,
                    fill: "forwards",
                }
            );
        } else {
            document.getElementById('uploadText').hidden = false;
            document.getElementById('dots').hidden = false;
            document.getElementById("currentFileUploading").hidden = false;
            document.getElementById("filesUploaded").hidden = false;
            document.getElementById("percentage").hidden = false;
            document.getElementById('progress').hidden = false;
            document.getElementById("cancelUpload").style = "display:flex";
            document.getElementById("hideUploadStatus").style = "width: 8%;left: 92%";

            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(180deg)" }
                ],
                                
            {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
            }
            );

            document.getElementById("uploadStatusBox").animate(
                [
                    {width: "10%"},
                    {width: "100%"}
                ],

                {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
            }
            );

            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(-10%)" }
                ],
                                
            {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
            }
            );
        }
    }
}

function hideUploadStatus(completely) {
    if (window.innerWidth > 600) {
        if (completely) {
            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(120%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
            
            document.getElementById('uploadText').hidden = false;
            document.getElementById('dots').hidden = false;
            document.getElementById('cancelUpload').hidden = false;
            document.getElementById("currentFileUploading").hidden = false;
            document.getElementById("filesUploaded").hidden = false;
            document.getElementById("percentage").hidden = false;
            document.getElementById('progress').hidden = false;
            document.getElementById("cancelUpload").style = "display:flex;";
            document.getElementById("hideUploadStatus").style = "left: 92%;;width: 8%";
            document.getElementById("uploadStatusBox").animate(
                [
                    {width: "10%"},
                    {width: "100%"}
                    
                    
                ],

                {
                    duration: 0,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(0deg)" }
                ],
                                
               {
                    duration: 0,
                    iterations: 1,
                    fill: "forwards",
               }
            ); 
        } else {
            document.getElementById('uploadText').hidden = true;
            document.getElementById('dots').hidden = true;
            document.getElementById('cancelUpload').hidden = true;
            document.getElementById("currentFileUploading").hidden = true;
            document.getElementById("filesUploaded").hidden = true;
            document.getElementById("percentage").hidden = true;
            document.getElementById('progress').hidden = true;
            document.getElementById("cancelUpload").style = "display:none;";
            document.getElementById("hideUploadStatus").style = "left: 0%;width: 100%";
            
            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(0deg)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("uploadStatusBox").animate(
                [
                    
                    {width: "100%"},
                    {width: "10%"}
                    
                ],

                {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(88%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
        }
    } else {
        if (completely) {
            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(120%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
            
            document.getElementById('uploadText').hidden = false;
            document.getElementById('dots').hidden = false;
            document.getElementById('cancelUpload').hidden = false;
            document.getElementById("currentFileUploading").hidden = false;
            document.getElementById("filesUploaded").hidden = false;
            document.getElementById("percentage").hidden = false;
            document.getElementById('progress').hidden = false;
            document.getElementById("cancelUpload").style = "display:flex;";
            document.getElementById("hideUploadStatus").style = "left: 92%;;width: 8%";
            document.getElementById("uploadStatusBox").animate(
                [
                    {width: "10%"},
                    {width: "100%"}
                    
                    
                ],

                {
                    duration: 0,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(0deg)" }
                ],
                                
               {
                    duration: 0,
                    iterations: 1,
                    fill: "forwards",
               }
            ); 
        } else {
            document.getElementById('uploadText').hidden = true;
            document.getElementById('dots').hidden = true;
            document.getElementById('cancelUpload').hidden = true;
            document.getElementById("currentFileUploading").hidden = true;
            document.getElementById("filesUploaded").hidden = true;
            document.getElementById("percentage").hidden = true;
            document.getElementById('progress').hidden = true;
            document.getElementById("cancelUpload").style = "display:none;";
            document.getElementById("hideUploadStatus").style = "left: 0%;width: 100%";
            
            document.getElementById("statusArrow").animate(
                [
                    { transform: "rotate(0deg)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("uploadStatusBox").animate(
                [
                    
                    {width: "100%"},
                    {width: "10%"}
                    
                ],

                {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
            );

            document.getElementById("uploadStatusWrapper").animate(
                [
                    { transform: "translateX(45%)" }
                ],
                                
               {
                    duration: 250,
                    iterations: 1,
                    fill: "forwards",
               }
              );
        }
    }
}

function toggleProfileInfo() {
    let menu = document.getElementById("profileDropDown");
    if (menu.hidden) {
        menu.hidden = false;
        menu.animate(
        [      
            {height: "0vw"},
            {height: "5vw"}  
        ],

        {
            duration: 250,
            iterations: 1,
            fill: "forwards",
       });

        setTimeout(() => {
            document.getElementById("triangle").style = "display: block";
        },250);

       document.getElementById("availableSpaceDiv").hidden = false;
       document.getElementById("takenSpaceDiv").hidden = false;
       document.getElementById("logout").hidden = false;
    } else {
        document.getElementById("triangle").style = "display: none";
        menu.animate(
            [      
                {height: "5vw"},
                {height: "0vw"}  
            ],
    
            {
                duration: 250,
                iterations: 1,
                fill: "forwards",
           });
        setTimeout(() => {
            menu.hidden = true;
        },250);
        document.getElementById("availableSpaceDiv").hidden = true;
        document.getElementById("takenSpaceDiv").hidden = true;
        document.getElementById("logout").hidden = true;
    }
}

function enableUploadTools() {
    document.getElementById("fileUploadButDisabled").id = "fileUploadBut";
    document.getElementById("createFolderButDisabled").id = "createFolderBut";
    document.getElementById("fileUploadButIcon").style = "fill: rgba(0,0,0,1);";
    document.getElementById("createFolderButSvg").style = "fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
    document.getElementById("fileUploadBut").onclick = function() {
        document.getElementById('file-input').click()
    };

    document.getElementById("createFolderBut").onclick = function() {
        makeFolder();
    };

    document.getElementById("fileDisplayDiv").querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });

    document.getElementById("fileDisplayDiv").querySelectorAll(".fileName").forEach(element => {
        element.style.color = "black";
    }); 

    document.getElementById("fileDisplayDiv").querySelectorAll("svg").forEach(element => {
        element.style.fill = "black";
    });

    document.getElementById("returnToMainIcon").style = "fill: rgba(0,0,0,1)";
    document.getElementById("returnToMain").onclick = function() {
        openPreviousFolder();
    }

    if (document.getElementById("currentFolderDiv").innerHTML == "Directory: main folder") {
        document.getElementById("returnToMain").style = "display: none";
    } else {
        document.getElementById("returnToMain").style = "display: flex;cursor: pointer";
    }

    document.getElementById("searchbarIcon").disabled = false;
    document.getElementById("searchbarIcon").onmouseover = function () {
       this.style = "cursor:pointer;"
    }
    document.getElementById("searchBar").disabled = false;
    document.getElementById("searchBarDiv").onmouseover = function () {
        this.style = "cursor:auto;"
    }
}

function loadUsers() {
    $.ajax({
        url: "getUsers.php",
        type: "POST",
        success: function(response) {
            let splitResponse = response.split("!");
            
            document.getElementById("usersTable").innerHTML = splitResponse[0];
            document.getElementById("userCount").innerHTML = "Total user count: " + splitResponse[1];
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });
}

function loadRequests() {
    $.ajax({
        url: "loadRequests.php",
        type: "POST",
        success: function(response) {
            let splitResponse = response.split("!");
            
            document.getElementById("requests").innerHTML = splitResponse[0];
            document.getElementById("requestCount").innerHTML = "Total requests: " + splitResponse[1];
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });
}

function loadLogs() {
    $.ajax({
        url: "loadLogs.php",
        type: "POST",
        success: function(response) {
            // /\s*=\s*/g regex for whitespace around "=" replace 
            if (getLastLog(document.getElementById("logDiv").innerHTML).trim().replace(/\s*=\s*/g, "=") != getLastLog(response).trim().replace(/\s*=\s*/g, "=")) {
                document.getElementById("logDiv").innerHTML = response;
                var objDiv = document.getElementById("logDiv");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });
}

function getLastLog(text) {
    let first = true;
    let index = -1;
    for (let i = text.length - 1; i > -1; i--) {
        if (text[i] == "<" && !first) {
            index = i;
            break;
        }

        if (text[i] == "<") {
            first = false;
        }
    }

    return text.substring(index);
}

function showFolderDeleteWarning(folderName) {
    document.getElementById("folderDeleteWarningHeader").innerHTML = "Are you sure you want to delete " + folderName +" and its contents ?";
    document.getElementById("folderDelete").hidden = false;
    document.getElementById("folderDelteSub").onclick = function () {
        deleteFolder(folderName);
    };
}

function showFileDeleteWarning(fileName) {
    document.getElementById("fileDeleteWarningHeader").innerHTML = "Are you sure you want to delete " + fileName +" ?";
    document.getElementById("fileDelete").hidden = false;
    document.getElementById("fileDelteSub").onclick = function () {
        removeFile(fileName);
    };
}
