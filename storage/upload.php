<?php 
session_start();

$path = $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_SESSION["uploadFileName"];
$chunk = file_get_contents('php://input');

echo file_put_contents($path,$chunk,FILE_APPEND);

