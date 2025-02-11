<?php
 session_start();
 
 if (empty($_SESSION["userid"])) {
            header ("Location: /");
 }
set_time_limit(-1);
   
 if (isset($_GET["file"])) {
        $file = $_SESSION["rootPath"] . $_SESSION["user"] . "/" . $_GET["file"];
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename='.basename($file));
        header('Expires: 0');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        ob_clean();
        ob_end_flush();
        readfile($file);
        exit;
    }
   header("Location: /storage");
