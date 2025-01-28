//Document onload
$(function() {

    $.ajax({
        url: "openFolder.php",
        type: "POST",
        data: { 
            openedDir: "main"
        },
        success: function(response) {
            document.getElementById("currentFolderDiv").innerHTML = "Directory: " + response + " folder";
            document.getElementById("returnToMain").style = "display:none";
            loadFiles(addEventListenersToFiles);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });

    document.getElementById("uploadStatusWrapper").animate(
        [
            { transform: "translateX(120%)" }
        ],
                      
        {
            duration: 0,
            iterations: 1,
            fill: "forwards",
        }
    );

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

    document.getElementById("hideStatusBox").addEventListener("click",function() {
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
    });

    getTemp();
    setInterval(getTemp,1500);
    loadFiles(addEventListenersToFiles);
    getFreeSpace();

    document.getElementById("hideUploadStatus").addEventListener("click",function(){
        console.log(document.getElementById("uploadStatusBox").offsetWidth);
        if (document.getElementById("uploadStatusBox").offsetWidth > 100) {
            hideUploadStatus(false);
        } else {
            showUploadStatus(false)
        }
    });
    
    document.getElementById("file-input").addEventListener("change", function() {
        upload();
    });
    

    $(".tooltip").hide();
        $("#uploadButton").mouseenter(function() {
            if (document.getElementById("file-input").files.length == 0) 
                $(".tooltip").fadeIn(100);
        });
        
        $("#uploadButton").on("mouseleave", function() {
            if (document.getElementById("file-input").files.length == 0) 
                $(".tooltip").fadeOut(100);
        });
    });



function loadFiles(callback) {
            $.ajax({
                url: "loadFiles.php",
                type: "POST",
                dataType:"html",
                success: function(response) {
                    document.getElementById("fileDisplayDiv").innerHTML = response;
                    if (document.getElementById("fileDisplayDiv").innerHTML == "") {
                        document.getElementById("noFilesDisplay").style = "display:flex";
                    } else {
                        document.getElementById("noFilesDisplay").style = "display:none";
                    }
                    callback();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    document.getElementById("fileDisplayDiv").innerHTML = "Error: " + textStatus + " - " + errorThrown;
                }
            });
        }

function addEventListenersToFiles() {
    const files = document.querySelectorAll(".file");
    const dropdown = document.querySelectorAll(".dropDown");
    dropdown.forEach((element) => {
        element.classList.add("hide");
    });
    document.body.addEventListener("click", () => {
        files.forEach((file) => {
            let dropDown = file.querySelector(".dropDown");
            if (dropDown.classList.contains("active")) {
                let dots = file.querySelectorAll(".dot");
                dropDown.style.animationName = "hide";
                
                file.querySelectorAll("svg")[1].animate(
                    [
                        { transform: "rotate(0deg)" },
                    ],
                    
                    {
                        duration: 250,
                        iterations: 1,
                        fill: "forwards",
                    }
                );
                
                setTimeout(() => {
                    dropDown.classList.remove("active");
                    dropDown.classList.add("hide");
                },250);
            }
        });
    });
   files.forEach((file) => {
        let element = file.querySelector(".dotDiv");
        element.addEventListener("click", function(event) {
            let dropDown = file.querySelector(".dropDown");
            if (dropDown.classList.contains("active")) {
                dropDown.style.animationName = "hide";
                
                file.querySelectorAll("svg")[1].animate(
                    [
                        { transform: "rotate(0deg)" },
                    ],
                    
                    {
                        duration: 250,
                        iterations: 1,
                        fill: "forwards",
                    }
                );
                
                
                setTimeout(() => {
                    dropDown.classList.remove("active");
                    dropDown.classList.add("hide");
                },250);
                
            } else {
                dropDown.style.animationName = "active";
                
                file.querySelector(".dropDown").childNodes[0].style = "display:block";
                dropDown.classList.remove("hide");
                dropDown.classList.add("active");
                
                file.querySelectorAll("svg")[1].animate(
                    [
                        { transform: "rotate(90deg)" },
                    ],
                    
                    {
                        duration: 250,
                        iterations: 1,
                        fill: "forwards",
                    }
                );
                
            }
            event.stopPropagation();
            });
        });
}

function download(a) {
    window.location.href = "download.php?file=" + a;
}

function getFreeSpace() {
    /*$.ajax({
        url: "getFreeSpace.php",
        type: "POST",
        dataType:"text",
        success: function(response) {
            document.getElementById("storage").innerHTML = response;
            return response;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            document.getElementById("storage").innerHTML = "Error: " + textStatus + " - " + errorThrown;
        }
    });*/
}
    

function dotsAnim(num) {
    document.getElementById("dots").innerHTML = ".".repeat((num % 4));
    num++;
    setTimeout(() => {dotsAnim(num)},1000);
}

function upload() {
    let files = document.getElementById("file-input").files;
    if (files.length > 0) {
        let enoughSpace = true;
        let totalFileSize = 0;

        Array.from(files).forEach((file) => {
            totalFileSize += file.size;
        });

        if (getFreeSpace() < totalFileSize) {
            enoughSpace = false;
        }
        if (enoughSpace) {
            
            let noDuplicate = true;

            Array.from(files).forEach((file) => {
                let xhr = new XMLHttpRequest();
                let formData = new FormData();
                formData.append("filename",file.name);
                xhr.open("POST","checkDuplicate.php",false);
                xhr.send(formData);
                
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200 && xhr.responseText == 1) {
                    } else {
                        noDuplicate = false;
                    }
                }
            });
            
    
            if(noDuplicate) {
                let cancelled = false;
                document.getElementById("cancelUpload").addEventListener("click", function() {
                    cancelled = true;
                });

                showUploadStatus(true);
                dotsAnim(0);
                document.getElementById("fileUploadBut").onclick = function() {

                };
                document.getElementById("fileUploadBut").id = "fileUploadButDisabled";
                document.getElementById("fileUploadButIcon").style = "fill: rgba(80,80,80,1);";
                document.getElementById("fileDisplayDiv").querySelectorAll("button").forEach(button => {
                    button.disabled = true;
                });
                document.getElementById("returnToMain").style = "cursor: not-allowed";
                document.getElementById("returnToMainIcon").style = "fill: rgba(80,80,80,1)";
                document.getElementById("returnToMain").onclick = function() {

                };

                let fileChunks = [];
                const chunkSize = 20 * 1024 * 1024;
                
                Array.from(files).forEach((file) => {
                    let start = 0;
                    let chunksFromFile = [];
                    while (start < file.size) {
                        let chunk = file.slice(start,start+chunkSize);
                        chunksFromFile.push(chunk);
                        start += chunkSize;
                    }
                    fileChunks.push(chunksFromFile);
                });
                
                
                
                
                let fileIndex = 0;
                let chunkIndex = 0;
                
                const beforeUnloadFn = function(event) {
                    const url = "cancelUploadDelete.php";
                    const data = new FormData();
                    data.append("fileName", files[fileIndex].name);
                    navigator.sendBeacon(url, data);
                };
                window.addEventListener("beforeunload", beforeUnloadFn);
                
                if (!cancelled) {
                    let xhr = new XMLHttpRequest();
                    let formData = new FormData();
                    
                    formData.append("blob",fileChunks[fileIndex][chunkIndex]);
                    formData.append("fileName",files[fileIndex].name);
                    
                    xhr.open("POST","upload.php");
                    
                    xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            
                            let currentSize = 0;
                            for (let i = 0; i < chunkIndex+1; i++) {
                                currentSize += fileChunks[fileIndex][i].size;
                            }
                            document.getElementById("progress").value = (currentSize / files[fileIndex].size) * 100;
                            document.getElementById("percentage").innerHTML = Math.floor(((currentSize / files[fileIndex].size) * 100)) + "%";
                            document.getElementById("filesUploaded").innerHTML = "Uploaded: " + fileIndex + " files";
                            document.getElementById("currentFileUploading").innerHTML = "Currently uploading: " + files[fileIndex].name;
                            
                            if (chunkIndex < fileChunks[fileIndex].length -1) {
                                //window.removeEventListener("beforeunload",beforeUnloadFn);
                                sendNextChunk(fileIndex,chunkIndex + 1,fileChunks,files,cancelled);
                            }else {
                                if (fileIndex < fileChunks.length-1) {
                                    /*let xhr = new XMLHttpRequest();
                                    let formData = new FormData();
                                    formData.append("fileName",files[fileIndex].name);
                                    xhr.open("POST","makeRow.php",false);
                                    xhr.send(formData);*/
                                    $.ajax({
                                        url: "makeRow.php",
                                        type: "POST",
                                        async: false,
                                        data: { 
                                            name: files[fileIndex].name,
                                            isDir: 0
                                        }
                                    });
                                    
                                    loadFiles(addEventListenersToFiles);
                                    getFreeSpace();
                                    window.removeEventListener("beforeunload",beforeUnloadFn);
                                    sendNextChunk(fileIndex + 1,0,fileChunks,files,cancelled);
                                } else {
                                    /*let xhr = new XMLHttpRequest();
                                    let formData = new FormData();
                                    formData.append("fileName",files[fileIndex].name);
                                    xhr.open("POST","makeRow.php",false);
                                    xhr.send(formData);*/
                                    $.ajax({
                                        url: "makeRow.php",
                                        type: "POST",
                                        async: false,
                                        data: { 
                                            name: files[fileIndex].name,
                                            isDir: 0
                                        }
                                    });
                                    if(files.length > 1) {
                                        document.getElementById("file-input").value = "";
                                        hideUploadStatus(true);
                                        enableUploadTools();
                                        displaySuccess("Files uploaded");
                                    } else {
                                        document.getElementById("file-input").value = "";
                                        hideUploadStatus(true);
                                        enableUploadTools();
                                        displaySuccess("File uploaded");
                                    }
                                    window.removeEventListener("beforeunload",beforeUnloadFn);
                                    getFreeSpace();
                                    loadFiles(addEventListenersToFiles);
                                }
                            }
                        } else {
                            displayError("Request failed. " + xhr.status);
                        }
                    };
                }
                xhr.send(formData);
            } else {
                $.ajax({
                    url: "cancelUploadDelete.php",
                    type: "POST",
                    data: { fileName: files[fileIndex].name},
                    success: function(response) {
                        enableUploadTools();
                        displaySuccess("Upload cancelled");
                        document.getElementById("file-input").value = "";
                        hideUploadStatus(true);
                        getFreeSpace();
                        loadFiles(addEventListenersToFiles);
                    },
                    error: function() {
                        displayError("Failed to cancel upload");
                    }
                    
                });
            }
            } else {
                document.getElementById("file-input").value = "";
                displayError("File/Folder with this name already exists"); 
            }
        } else {
            displayError("Not enough space");
        }
    } else {
        displayError("No files selected");
    }
}
    
function sendNextChunk(fileIndex,chunkIndex,fileChunks,files,cancel) {
    const beforeUnloadFn = function(event) {
        const url = "cancelUploadDelete.php";
        const data = new FormData();
        data.append("fileName", files[fileIndex].name);
        navigator.sendBeacon(url, data);
    };
    window.addEventListener("beforeunload", beforeUnloadFn);

    let cancelled = cancel;
    document.getElementById("cancelUpload").addEventListener("click", function() {
        cancelled = true;
    });
    
    if (!cancelled) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
            
        formData.append("blob",fileChunks[fileIndex][chunkIndex]);
        formData.append("fileName",files[fileIndex].name);
            
        xhr.open("POST","upload.php");
            
        xhr.onreadystatechange =function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                
                let currentSize = 0;
                for (let i = 0; i < chunkIndex+1; i++) {
                    currentSize += fileChunks[fileIndex][i].size;
                }
                document.getElementById("progress").value = (currentSize / files[fileIndex].size) * 100;
                document.getElementById("percentage").innerHTML = Math.floor(((currentSize / files[fileIndex].size) * 100)) + "%";
                document.getElementById("filesUploaded").innerHTML = "Uploaded: " + fileIndex + "/" + files.length + " files";
                document.getElementById("currentFileUploading").innerHTML = "Currently uploading: " + files[fileIndex].name;
                            
                if (chunkIndex < fileChunks[fileIndex].length -1) {
                    window.removeEventListener("beforeunload",beforeUnloadFn);
                    sendNextChunk(fileIndex,chunkIndex + 1,fileChunks,files,cancelled);
                }else {
                    if (fileIndex < fileChunks.length-1) {
                        /*let xhr = new XMLHttpRequest();
                        let formData = new FormData();
                        formData.append("fileName",files[fileIndex].name);
                        xhr.open("POST","makeRow.php",false);
                        xhr.send(formData);*/

                        $.ajax({
                            url: "makeRow.php",
                            type: "POST",
                            async: false,
                            data: { 
                                name: files[fileIndex].name,
                                isDir: 0
                            }
                        });
                        
                        getFreeSpace();
                        loadFiles(addEventListenersToFiles);
                        window.removeEventListener("beforeunload",beforeUnloadFn);
                        sendNextChunk(fileIndex + 1,0,fileChunks,files,cancelled);
                    } else {
                        /*let xhr = new XMLHttpRequest();
                        let formData = new FormData();
                        formData.append("fileName",files[fileIndex].name);
                        xhr.open("POST","makeRow.php",false);
                        xhr.send(formData);*/

                        $.ajax({
                            url: "makeRow.php",
                            type: "POST",
                            async: false,
                            data: { 
                                name: files[fileIndex].name,
                                isDir: 0
                            }
                        });

                        if(files.length > 1) {
                            document.getElementById("file-input").value = "";
                            hideUploadStatus(true);
                            enableUploadTools();
                            displaySuccess("Files uploaded");
                        } else {
                            document.getElementById("file-input").value = "";
                            hideUploadStatus(true); 
                            enableUploadTools();
                            displaySuccess("File uploaded");
                        }
                        window.removeEventListener("beforeunload",beforeUnloadFn);
                        getFreeSpace();
                        loadFiles(addEventListenersToFiles);
                    }
                }
                } else {
                    displayError("Request failed. " + xhr.status);
                }
            };
        }
        xhr.send(formData);
    } else {
        $.ajax({
            url: "cancelUploadDelete.php",
            type: "POST",
            data: {fileName: files[fileIndex].name},
            success: function() {
                enableUploadTools();
                displaySuccess("Upload cancelled");
                document.getElementById("file-input").value = "";
                hideUploadStatus(true);
                getFreeSpace();
                loadFiles(addEventListenersToFiles);
            },
            error: function() {
                displayError("Failed to cancel upload");
            }
        });
    }
}

function getTemp() {
    /*fetch('get_temp.php')
    .then(response => response.text())
    .then(temp => {
    let tempElement = document.getElementById("temp");
    tempElement.innerHTML = temp + "°C";
    if (temp < 65) {
        tempElement.style.color = "green";
    } else if (temp >= 65 && temp < 85) {
        tempElement.style.color = "rgb(245, 120, 66)";
    } else {
            
        tempElement.style.color = "red";
    }
})
.catch(error => console.error("Error fetching temperature",error));*/
}
    

function back() {
    document.getElementById("renameContainer").hidden = true;
    document.getElementById("newFolderContainer").hidden = true;
}

function removeFile(fileName) {
    $.ajax({
        url: "deleteFile.php",
  	    type: "POST",
        data: {fileName: fileName},
 	    success: function(response) {
            displaySuccess("Removed file");
            getFreeSpace();
            loadFiles(addEventListenersToFiles);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Error: " + errorThrown);
  	    }
 	});	
}

function renameFile(fileName) {
    document.getElementById("newFileNameInput").value = "";
    document.getElementById("renameContainer").hidden = false;
    document.getElementById("renameSub").addEventListener("click", function() {
        $.ajax({
            url: "renameFile.php",
            type: "POST",
            data: { 
                oldFileName: fileName, 
                newFileName: document.getElementById("newFileNameInput").value 
            },
            success: function(response) {
                displaySuccess("Renamed file"); 
                document.getElementById("renameContainer").hidden = true;
                loadFiles(addEventListenersToFiles);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                displayError("ERROR: " + errorThrown);
            }
        });
    });
}

function displayError(errorText) {
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
    document.getElementById("statusIcon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 0, 0, 1);transform: ;msFilter:;"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>';
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
}

function displaySuccess(successText) {
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
    document.getElementById("statusText").style = "font-size: 1.2vw";
    
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
}

function showUploadStatus(completely) {
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
        document.getElementById('cancelUpload').hidden = false;
        document.getElementById("currentFileUploading").hidden = false;
        document.getElementById("filesUploaded").hidden = false;
        document.getElementById("percentage").hidden = false;
        document.getElementById('progress').hidden = false;
        document.getElementById("cancelUpload").hidden = false;
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
}

function hideUploadStatus(completely) {
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
        document.getElementById("cancelUpload").hidden = false;
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
        document.getElementById("cancelUpload").hidden = true;
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

function makeFolder() {
    document.getElementById("newFolderName").value = "";
    document.getElementById("newFolderContainer").hidden = false;
    const folderSubButClickEL = function() {
        back();
        $.ajax({
            url: "checkDuplicate.php",
            type: "POST",
            data: { 
                filename: document.getElementById("newFolderName").value
            },
            success: function(response) {
                if (response == 1) {
                    $.ajax({
                        url: "makeRow.php",
                        type: "POST",
                        data: { 
                            name: document.getElementById("newFolderName").value,
                            isDir: 1
                        },
                        success: function(response) {
                            displaySuccess("Folder created"); 
                            document.getElementById("newFolderSub").removeEventListener("click",folderSubButClickEL);
                            loadFiles(addEventListenersToFiles);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            displayError("ERROR: " + errorThrown);
                        }
                    });
                } else {
                    displayError("Folder/File with this name already exists")
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                displayError("ERROR: " + errorThrown);
            }
        });
    }
    document.getElementById("newFolderSub").addEventListener("click", folderSubButClickEL);
}

function openFolder(folderName) {
    $.ajax({
        url: "openFolder.php",
        type: "POST",
        data: { 
            openedDir: folderName
        },
        success: function(response) {
            document.getElementById("currentFolderDiv").innerHTML = "Directory: " + response + " folder";
            if (folderName == "main") {
                document.getElementById("returnToMain").style = "display:none";
            } else {
                document.getElementById("returnToMain").style = "display:flex";
            }
            loadFiles(addEventListenersToFiles);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });
}

function deleteFolder(folderName) {
    $.ajax({
        url: "deleteFolderContent.php",
        type: "POST",
        data: {
            folderName: folderName
        },
        success: function(response) {
            console.log(response);
            displaySuccess("Folder deleted");
            loadFiles(addEventListenersToFiles);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });
}

function enableUploadTools() {
    document.getElementById("fileUploadButDisabled").id = "fileUploadBut";
    document.getElementById("fileUploadButIcon").style = "fill: rgba(0,0,0,1);";
    document.getElementById("fileUploadBut").onclick = function() {
        document.getElementById('file-input').click()
    };
    document.getElementById("fileDisplayDiv").querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });
    document.getElementById("returnToMain").style = "cursor: pointer";
    document.getElementById("returnToMainIcon").style = "fill: rgba(0,0,0,1)";
    document.getElementById("returnToMain").onclick = function() {
        openFolder("main");
    }
}


function loadUsers() {
    $.ajax({
        url: "getUsers.php",
        type: "POST",
        success: function(response) {
            document.getElementById("usersTable").innerHTML = response;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });
}