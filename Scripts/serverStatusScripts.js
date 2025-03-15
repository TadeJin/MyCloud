function getTemp() {

    $.ajax({
        url: "../PhpScripts/getTemp.php",
        type: "POST",
        success: function(response) {
            let tempElement = document.getElementById("cpuTemp");
            tempElement.innerHTML = response + "°C";
            if (response < 45) {
                tempElement.style = "color: green";
            } else if (response >= 45 && response < 70) {
                tempElement.style = "color: rgb(245, 120, 66)";
            } else {
                    
                tempElement.style = "color: red";
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR GETTING SERVER TEMPERATURE");
        }
    })
}

function getCpuUsage() {
    $.ajax({
        url: "../PhpScripts/getCpuUsage.php",
        type: "POST",
        success: function(response) {
            let usage = document.getElementById("cpuUsage");
            usage.innerHTML = response + "%";
            if (response < 50) {
                usage.style = "color: green";
            } else if (response >= 50 && response < 80) {
                usage.style = "color: rgb(245, 120, 66)";
            } else {
                    
                usage.style = "color: red";
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR GETTING SERVER TEMPERATURE");
        }
    })
}



function getFreeSpace() {
    $.ajax({
        url: "../PhpScripts/getFreeSpace.php",
        type: "POST",
        dataType:"text",
        success: function(response) {
            document.getElementById("availableStorage").innerHTML = response;
            document.getElementById("availableSpaceDiv").innerText = "Available storage: " + response;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("ERROR GETTING AVAILABLE SPACE");
        }
    });
}

function getFreeSpaceRaw() {
    let space = 0;
    $.ajax({
        url: "../PhpScripts/getFreeSpaceRaw.php",
        type: "POST",
        async: false,
        dataType:"text",
        success: function(response) {
            space = response
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("ERROR GETTING AVAILABLE SPACE");
        }
    });

    return space;
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
        let date = new Date();
        sendLogServer("Server rebooted at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
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

function sendLogServer(message) {
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
