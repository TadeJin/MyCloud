<?php
    session_start();
    $host = "localhost";
    $user = "root";
    $passwd = "";
    $db = "MyCloud";

    $connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");

    $SQL = $connect->prepare("SELECT filename FROM files WHERE user_iduser = ?");
    $SQL ->bind_param("s", $userid);

    $userid = $_SESSION["userid"];
    $SQL -> execute();

    $result = $SQL->get_result();
    
    $htmlOutput = '';

    while ($row = $result -> fetch_assoc()) {
		$filename;
        if (strlen($row["filename"]) > 11) {
			$filename = substr($row["filename"],0,11) . "...";
		} else {
			$filename = $row["filename"];
        }
            
		$htmlOutput .= 
	    '<div class = "file">
			<div class="fileButDiv">
				<button class = "fileBut" onclick="download(this.name)" name = "'. $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["filename"] .'">
				<div class = "fileName" title="'.$row["filename"] .'">' . $filename .'</div>
				<div class = "dotDiv">
			    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
			</div>
		    </button>
		</div>

		<div class="dropDown">
		    <ul>
			<li class="dropDownBut"><button onclick="download(this.name)" name = "'. $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["filename"] . '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"/></svg>Download</button></li>
			<li class="dropDownBut"><button onclick="renameFile(this.name)" name = "' . htmlspecialchars($row["filename"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg>Rename</button></li>
			<li class="dropDownBut" style="margin-bottom: 0;"><button onclick = "removeFile(\'' . $row["filename"] . '\')" name = "'. $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["filename"] . '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"/></svg>Remove</button></li>
		    </ul>
		</div>
	    </div>';
        }
        
        echo $htmlOutput;
