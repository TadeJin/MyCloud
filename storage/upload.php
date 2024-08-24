<?php 
session_start();

$path = $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_POST["fileName"];
$chunk = file_get_contents($_FILES["blob"]["tmp_name"]);

echo file_put_contents($path,$chunk,FILE_APPEND);

