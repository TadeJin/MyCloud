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
    let fileTrace = document.getElementById("folderTrace").value.split(";");
    let fileIndex = -1;

    for(let i = 0; i < fileTrace.length;i++) {
        if (fileTrace[i] == folderName) {
            fileIndex = i;
            break;
        }
    }

    if (fileIndex == -1) {
        document.getElementById("returnToMainIcon").onclick = 'openFolder("' + fileTrace[-1] + '")';
        document.getElementById("folderTrace").value += folderName + ";";
    } 

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