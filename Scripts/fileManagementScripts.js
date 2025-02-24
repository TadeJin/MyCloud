function makeFolder() {
    document.getElementById("newFolderName").value = "";
    document.getElementById("newFolderContainer").hidden = false;
    const folderSubButClickEL = function() {
        const regex = new RegExp('[*"\\\\/<>:|?]');

        if (regex.test(document.getElementById("newFolderName").value) || document.getElementById("newFolderName").value == "") {
            document.getElementById("forbiddenCharCheckFolder").style.display = "block";
        } else {
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
        const regex = new RegExp('[*"\\\\/<>:|?]');

        if (regex.test(document.getElementById("newFileNameInput").value) || document.getElementById("newFileNameInput").value == "") {
            document.getElementById("forbiddenCharCheckRename").style.display = "block";
        } else {
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
        }
        
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


function selectFiles() {
    if (document.getElementById("mutipleFileControlValue").value == "0") { //Reveals
        document.getElementById("mutipleFileControl").innerHTML = '<input type="hidden" id = "mutipleFileControlValue" value = "1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>';
        document.getElementById("mutipleFileControl").title = "Unselect files";
        document.getElementById("downloadMultiple").style = "display: inline-block;margin-left: 5%;";
        document.getElementById("deleteMultiple").style = "display: inline-block;margin-left: 10%;";
        document.getElementById("selectAll").style = "display: inline-block;";
        document.getElementById("fileDisplayDiv").querySelectorAll(".fileName").forEach(element => {
            element.style.height = "0";
        });
        loadFiles(addEventListenersToFiles);
    } else if (document.getElementById("mutipleFileControlValue").value == "1") { //Hides
        document.getElementById("mutipleFileControl").innerHTML = '<input type="hidden" id = "mutipleFileControlValue" value = "0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zm8.933 3.519-1.726-1.726-1.414 1.414 3.274 3.274 5.702-6.84-1.538-1.282z"></path></svg>';
        document.getElementById("downloadMultiple").style = "display:none";
        document.getElementById("deleteMultiple").style = "display:none";
        document.getElementById("selectAll").style = "display: none";
        document.getElementById("mutipleFileControl").title = "Select files";
        document.getElementById("selectedFiles").value = "";
        loadFiles(addEventListenersToFiles);
    }
}

function addSelection(checkbox) {
    if (checkbox.checked) {
        document.getElementById("selectedFiles").value += checkbox.value + ";";
    } else {
        let tmp = "";

        document.getElementById("selectedFiles").value.split(";").forEach(element => {
            if (element != checkbox.value && element != "") {
                tmp += element + ";";
            }
        });

        document.getElementById("selectedFiles").value = tmp;
    }
}

function deleteSelected() {
    if (document.getElementById("selectedFiles").value != "") {
        let files = document.getElementById("selectedFiles").value.split(";");

        files.forEach(file => {
            removeFile(file);
        });
        document.getElementById("selectedFiles").value = "";
    } else {
        displayError("No files selected");
    }
}

function downloadSelected() {
    if (document.getElementById("selectedFiles").value != "") {
        window.location.href = "downloadMultiple.php?files=" + document.getElementById("selectedFiles").value;
        displaySuccess("Creating ZIP");
    } else {
        displayError("No files selected");
    }
}

function moveFile(file) {
    document.getElementById("movedFile").value = file;
    
    document.getElementById("moveContainer").hidden = false;
    $.ajax({
        url: "getDirectories.php",
        type: "POST",
        data: { 
            fileName: document.getElementById("movedFile").value, 
            newDir: document.getElementById("dirSelect").value 
        },
        success: function(response) {
            document.getElementById("dirSelect").innerHTML = '<option value = "">Select directory</option>' + response;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("ERROR: " + errorThrown);
        }
    });

    document.getElementById("moveSub").addEventListener("click", function() {
        $.ajax({
            url: "moveFile.php",
            type: "POST",
            data: { 
                fileName: document.getElementById("movedFile").value, 
                newDir: document.getElementById("dirSelect").value 
            },
            success: function(response) {
                displaySuccess("File moved"); 
                document.getElementById("moveContainer").hidden = true;
                document.getElementById("movedFile").value = "";
                loadFiles(addEventListenersToFiles);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                displayError("ERROR: " + errorThrown);
            }
        });
    });
}

function selectAllFiles() {

    document.querySelectorAll(".fileIcon").forEach(element => {
        element.childNodes[0].checked = !element.childNodes[0].checked;
        addSelection(element.childNodes[0]);
    });
}