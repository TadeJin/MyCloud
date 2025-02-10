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

function openPreviousFolder() {
    let tmp = document.getElementById("currentFolderDiv").innerHTML.split(" ");

    let currentFolder = "";
    tmp.forEach(element => {
        if (element != "Directory:") {
            currentFolder += element + ";";
        }
    });
    currentFolder = currentFolder.split(";");
    currentFolder.pop();
    currentFolder.pop();
    currentFolder = currentFolder.join(" ");


    $.ajax({
        url: "getPreviousFolder.php",
        type: "POST",
        data: { 
            currentDir: currentFolder
        },
        success: function(response) {
            openFolder(response);
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
            back();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
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

function removeFile(fileName) {
    $.ajax({
        url: "deleteFile.php",
  	    type: "POST",
        data: {fileName: fileName},
 	    success: function(response) {
            displaySuccess("Removed file");
            getFreeSpace();
            loadFiles(addEventListenersToFiles);
            back();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Error: " + errorThrown);
  	    }
 	});	
}