<?php
    session_start();
    include("../dbInfo/database.php");

	$connect = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
    $connect -> set_charset("UTF8") or die("Kódování nenastaveno");
	
	if ($_POST["searchString"] == "") {
		$SQL = $connect->prepare("SELECT name,isDir FROM storageData WHERE user_iduser = ? AND parentDir = ?");
		$SQL ->bind_param("ss", $userid,$parentDir);

		$userid = $_SESSION["userid"];
		$parentDir = $_SESSION["currentDir"];
		$SQL -> execute();
	} else {
		$SQL = $connect->prepare("SELECT name,isDir FROM storageData WHERE user_iduser = ? AND name LIKE ?");
		$SQL ->bind_param("ss", $userid,$search);

		$userid = $_SESSION["userid"];
		$search = "%" . $_POST["searchString"] . "%";
		$SQL -> execute();
	}

    $result = $SQL->get_result();
    
    $htmlOutput = '';

	$selectedFiles = explode(";",$_POST["selectedFiles"]);

    while ($row = $result -> fetch_assoc()) {
		$filename;
        if (strlen($row["name"]) > 11) {
			$filename = substr($row["name"],0,11) . "...";
		} else {
			$filename = $row["name"];
        }
        
		if ($row["isDir"] == 0) {
			if ($_POST["isSelecting"] == "0") {
				$htmlOutput .= 
				'<div class = "file">
					<div class="fileButDiv">
						<button class = "fileBut" onclick="download(this.name)" name = "' . $row["name"] .'">
						<div class = "fileIcon"><svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M18 22a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4zM7 8h3v2H7V8zm0 4h10v2H7v-2zm0 4h10v2H7v-2z"></path></svg></div>
						<div class = "fileName" title="'.$row["name"] .'">' . $filename .'</div>
						<div class = "dotDiv">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
					</div>
					</button>
				</div>

				<div class="dropDown">
					<ul>
					<li class="dropDownBut"><button onclick="download(this.name)" name = "' . $row["name"] . '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"/></svg>Download</button></li>
					<li class="dropDownBut"><button onclick="renameFile(this.name)" name = "' . htmlspecialchars($row["name"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg>Rename</button></li>
					<li class="dropDownBut"><button onclick="moveFile(this.name)" name = "' . htmlspecialchars($row["name"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path></svg>Move</button></li>
					<li class="dropDownBut" style="margin-bottom: 0;"><button onclick = "showFileDeleteWarning(\'' . $row["name"] . '\')" name = "'. $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["name"] . '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"/></svg>Remove</button></li>
					</ul>
				</div>
				</div>';
			} else if ($_POST["isSelecting"] == "1") {
				if (in_array($row["name"],$selectedFiles)) {
					$isChecked = "checked";
				} else {
					$isChecked = "";
				}
				$htmlOutput .= 
				'<div class = "file">
					<div class="fileButDiv">
						<button class = "fileBut" name = "'. $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["name"] .'">
						<div class = "fileIcon" style = "width: 8px; height: 8px;"><input type = "checkbox" value ="'. $row["name"] .'" style = "position:absolute;left: 0,top: 50%; transform: translate(0%,-50%);" onclick = "addSelection(this)"' . $isChecked . '></div>
						<div class = "fileName" title="'.$row["name"] .'">' . $filename .'</div>
						<div class = "dotDiv">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
					</div>
					</button>
				</div>

				<div class="dropDown">
					<ul>
					<li class="dropDownBut"><button onclick="download(this.name)" name = "' . $row["name"] . '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"/></svg>Download</button></li>
					<li class="dropDownBut"><button onclick="renameFile(this.name)" name = "' . htmlspecialchars($row["name"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg>Rename</button></li>
					<li class="dropDownBut"><button onclick="moveFile(this.name)" name = "' . htmlspecialchars($row["name"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path></svg>Move</button></li>
					<li class="dropDownBut" style="margin-bottom: 0;"><button onclick = "showFileDeleteWarning(\'' . $row["name"] . '\')" name = "'. $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $row["name"] . '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"/></svg>Remove</button></li>
					</ul>
				</div>
				</div>';
			}
		} else if ($row["isDir"] == 1) {
			$htmlOutput .= 
			'<div class = "file">
				<div class="fileButDiv">
					<button class = "fileBut" onclick="openFolder(this.name)" name = "' . $row["name"] . '">
					<div class = "fileIcon"><svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg></div>
					<div class = "fileName" title="'.$row["name"] .'">' . $filename .'</div>
					<div class = "dotDiv">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
				</div>
				</button>
			</div>

			<div class="dropDown">
				<ul>
				<li class="dropDownBut"><button onclick="openFolder(this.name)" name = "'. $row["name"] . '">Open</button></li>
				<li class="dropDownBut"><button onclick="renameFile(this.name)" name = "' . htmlspecialchars($row["name"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg>Rename</button></li>
				<li class="dropDownBut"><button onclick="moveFile(this.name)" name = "' . htmlspecialchars($row["name"]) .'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path></svg>Move</button></li>
				<li class="dropDownBut" style="margin-bottom: 0;"><button onclick = "showFolderDeleteWarning(\'' . $row["name"] . '\')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"/></svg>Remove</button></li>
				</ul>
			</div>
			</div>';
		}
    }  
$connect->close();

echo $htmlOutput;
