function loadFiles(callback) {
    // $.ajax({
    //     url: "loadFiles.php",
    //     type: "POST",
    //     dataType:"html",
    //     success: function(response) {
    //         document.getElementById("fileDisplayDiv").innerHTML = response;
    //         if (document.getElementById("fileDisplayDiv").innerHTML == "") {
    //             document.getElementById("noFilesDisplay").style = "display:flex";
    //             if (document.getElementById("searchBar").value != "") {
    //                 document.getElementById("noFilesDisplay").innerHTML = "No files found";
    //             } else {
    //                 document.getElementById("noFilesDisplay").innerHTML = "No files uploaded";
    //             }
    //         } else {
    //             document.getElementById("noFilesDisplay").style = "display:none";
    //         }
    //         callback();
    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         document.getElementById("fileDisplayDiv").innerHTML = "Error: " + textStatus + " - " + errorThrown;
    //     }
    // });

    let fileSearch = document.getElementById("searchBar").value;

        $.ajax({
            url: "loadFiles.php",
            type: "POST",
            dataType:"html",
            data: {
                searchString: fileSearch
            },
            success: function(response) {
                document.getElementById("fileDisplayDiv").innerHTML = response;
                if (document.getElementById("fileDisplayDiv").innerHTML == "") {
                    document.getElementById("noFilesDisplay").style = "display:flex";
                    if (document.getElementById("searchBar").value != "") {
                        document.getElementById("noFilesDisplay").innerHTML = "<div>No files found</div>";
                    } else {
                        document.getElementById("noFilesDisplay").innerHTML = "<div>No files uploaded</div>";
                    }
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

// function loadFiles(callback, isSearching) {
//     if (isSearching == 1) {
//         let fileSearch = document.getElementById("searchBar").value;

//         $.ajax({
//             url: "loadFiles.php",
//             type: "POST",
//             dataType:"html",
//             data: {
//                 searchString: fileSearch
//             },
//             success: function(response) {
//                 document.getElementById("fileDisplayDiv").innerHTML = response;
//                 if (document.getElementById("fileDisplayDiv").innerHTML == "") {
//                     document.getElementById("noFilesDisplay").style = "display:flex";
//                 } else {
//                     document.getElementById("noFilesDisplay").style = "display:none";
//                 }
//                 callback();
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 document.getElementById("fileDisplayDiv").innerHTML = "Error: " + textStatus + " - " + errorThrown;
//             }
//         });
//     }
// }

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