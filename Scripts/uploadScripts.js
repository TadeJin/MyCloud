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

                document.getElementById("fileDisplayDiv").querySelectorAll(".fileName").forEach(element => {
                    element.style.color = "lightgray";
                });  

                document.getElementById("fileDisplayDiv").querySelectorAll("svg").forEach(element => {
                    element.style.fill = "lightgray";
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
            
        setFileName(files[fileIndex].name);

        let xhr = new XMLHttpRequest();
        let chunk = fileChunks[fileIndex][chunkIndex];
            
        xhr.open("POST","upload.php");
        xhr.setRequestHeader("Content-Type", "application/octet-stream"); 
            
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
        xhr.send(chunk);
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

function setFileName(fileName) {
    $.ajax({
        url: "setUploadFileName.php",
        type: "POST",
        data: {fileName: fileName},
        async: false,
        success: function() {
            
        },
        error: function() {
            displayError("Failed to set fileName");
        }
    });
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    let files = dt.files;

    let dataTransfer = new DataTransfer();

    Array.from(files).forEach(file => {
        dataTransfer.items.add(file);
    });

    document.getElementById("file-input").files = dataTransfer.files;

    upload();
}

function iniDragDrop() {
    const prevents = (e) => e.preventDefault();
        let droparea = document.getElementById("dropArea");
        let dropareaDiv = document.getElementById("dropDiv");
        let body = document.querySelector("body");
    
        const active = () => {
            droparea.style = "background: rgba(83,83,83,0.5);z-index:5;";
            dropareaDiv.style = "z-index:2;display:block;";
        }

        const inactive = () => {
            dropareaDiv.style.display = "none";
            droparea.style.backgroundColor = "transparent";
            droparea.style.zIndex = 0;
            dropareaDiv.style.zIndex = 0;
        }
    
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
            body.addEventListener(evtName, prevents);
        });
    
        ['dragenter', 'dragover'].forEach(evtName => {
            body.addEventListener(evtName, active);
        });
    
        ['dragleave', 'drop'].forEach(evtName => {
            body.addEventListener(evtName, inactive);
        });
    
        body.addEventListener("drop", handleDrop);
}