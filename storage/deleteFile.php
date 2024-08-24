<?php
session_start();

if (file_exists($_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_POST["fileName"])) {
	unlink($_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_POST["fileName"]);
	$host = "localhost";
	$user = "root";
	$passwd = "";
	$db = "MyCloud";

	$connect1 = new mysqli($host, $user, $passwd, $db) or die("Spojení se nezdařilo");
	$connect1 -> set_charset("UTF8") or die("Kódování nenastaveno");

	$SQL1 = $connect1->prepare("DELETE FROM files WHERE filename = ? AND user_iduser = ?");
	$SQL1->bind_param("si",$fileName,$userid);

	$fileName = $_POST["fileName"];
	$userid = $_SESSION["userid"];
	$SQL1->execute();

	$connect1->close();
	echo 0;
	} else {
		echo -1;
	}
