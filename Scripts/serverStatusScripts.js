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

function newLog(message) {
    $.ajax({
        url: "createLog.php",
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

function rebootServer() {
    document.getElementById("rebootCheck").hidden = false;
    document.getElementById("rebootSub").addEventListener("click", function() {
        $.ajax({
            url: "../PhpScripts/rebootServer.php",
            type: "POST",
            success: function(response) {
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                displayError("ERROR: " + errorThrown);
            }
        });
    });
}