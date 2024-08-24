<?php
session_start();

$filePath =  $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_POST["fileName"];

if (file_exists($filePath)) {
	unlink($filePath);
} else {
	echo -1;
}
