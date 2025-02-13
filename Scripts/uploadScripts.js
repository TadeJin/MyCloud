function download(a) {
    window.location.href = "download.php?file=" + a;
}


function upload() { //Prepares files for upload and checks if upload is possible
    let date = new Date();

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
                //Configures Upload UI
                let cancelled = false;
                document.getElementById("cancelUpload").addEventListener("click", function() {
                    cancelled = true;
                });

                showUploadStatus(true);
                dotsAnim(0);
                document.getElementById("fileUploadBut").onclick = function() {

                };
                document.getElementById("fileUploadBut").id = "fileUploadButDisabled";

                document.getElementById("createFolderBut").onclick = () => {

                };
                document.getElementById("createFolderBut").id = "createFolderButDisabled";
                

                document.getElementById("createFolderButSvg").style = "fill: rgba(80, 80, 80, 1);transform: ;msFilter:;"
                document.getElementById("fileUploadButIcon").style = "fill: rgba(80,80,80,1);";

                document.getElementById("fileDisplayDiv").querySelectorAll("button").forEach(button => {
                    button.disabled = true;
                });
                document.getElementById("returnToMain").style = "cursor: not-allowed";
                document.getElementById("returnToMainIcon").style = "fill: rgba(80,80,80,1)";
                document.getElementById("returnToMain").onclick = function() {

                };

                document.getElementById("searchbarIcon").disabled = true;
                document.getElementById("searchbarIcon").onmouseover = function () {
                    this.style = "cursor: not-allowed";
                }
                document.getElementById("searchBar").disabled = true;
                document.getElementById("searchBarDiv").onmouseover = function () {
                    this.style = "cursor: not-allowed";
                }
                document.getElementById("searchBar").value = "";

                //Splits files into 20MB chunks to bypass CloudFlare 100MB max file size limit
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
                
                // Sets not completed file upload delete if user exits app mid upload
                const beforeUnloadFn = function(event) {
                    const url = "cancelUploadDelete.php";
                    const data = new FormData();
                    data.append("fileName", files[fileIndex].name);
                    navigator.sendBeacon(url, data);
                };
                window.addEventListener("beforeunload", beforeUnloadFn);
                
                if (!cancelled) {
                    sendChunk(fileIndex,chunkIndex,fileChunks,files,cancelled);
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
    
function sendChunk(fileIndex,chunkIndex,fileChunks,files,cancel) { //Sends file chunk to storage
    let date = new Date();

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
                document.getElementById("currentFileUploading").innerHTML = "Currently uploading: " + (files[fileIndex].name.length > 10 ? files[fileIndex].name.substring(0,10) + "..." : files[fileIndex].name);
                            
                if (chunkIndex < fileChunks[fileIndex].length -1) {
                    window.removeEventListener("beforeunload",beforeUnloadFn);
                    sendChunk(fileIndex,chunkIndex + 1,fileChunks,files,cancelled);
                }else {
                    if (fileIndex < fileChunks.length-1) {
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
                        sendChunk(fileIndex + 1,0,fileChunks,files,cancelled);
                    } else {
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
                            sendLog(" uploaded a file at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
                        } else {
                            document.getElementById("file-input").value = "";
                            hideUploadStatus(true); 
                            enableUploadTools();
                            displaySuccess("File uploaded");
                            sendLog(" uploaded a file at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
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

function sendLog(message) {
    $.ajax({
        url: "../createLog.php",
        type: "POST",
        data: {
            logMessage: message
        },
        success: function(response) {
           
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR LOGGING")
        }
    });
}

