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

    // getTemp();
    // setInterval(getTemp,1500);
    loadFiles(addEventListenersToFiles);
    // getFreeSpace();

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