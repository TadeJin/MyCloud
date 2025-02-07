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

    let folderTrace = document.getElementById("folderTrace");
    let folderIndex = folderTrace.value.split(";").indexOf(folderName);

    if (folderName != "main") {
        if (folderIndex == -1) {
            folderTrace.value += ";" + folderName;
            document.getElementById("returnToMain").onclick = () => {
                let split = folderTrace.value.split(";");
                openFolder(split[split.length - 2]);
            }
        } else if (folderIndex == 0) {
            folderTrace.value = "";
            openFolder("main");
        } else{
            let tmp = ";";
            let split = folderTrace.value.split(";");
            for (let i = 0; i < folderIndex;i++) {
                tmp += ";" + split[i+1];
            }
            folderTrace.value = tmp;
        }
    }

    $.ajax({
        url: "openFolder.php",
        type: "POST",
        data: { 
            openedDir: folderName
        },
        success: function(response) {
            document.getElementById("currentFolderDiv").innerHTML = "Directory: " + response + " folder";
            loadFiles(addEventListenersToFiles);
            if (response == "main") {
                document.getElementById("returnToMain").style = "display:none";
            } else {
                document.getElementById("returnToMain").style = "display:flex";
            }
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