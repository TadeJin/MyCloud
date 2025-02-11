<?php

    session_start();

    if (empty($_SESSION["userid"])) {
        header ("Location: /storage");
    }
    set_time_limit(-1);

    if (isset($_GET["files"])) {
        $zip = new ZipArchive;

        $files = explode(";",$_GET["files"]);
        $archive_file_name = "downloadedFiles.zip";

        if ($zip->open($archive_file_name,ZipArchive::CREATE) == TRUE) {
            foreach ($files as $file) {
                if ($file != "") {
                    $zip->addFile($_SESSION["rootPath"] . $_SESSION["user"] . "/" . $file,$file);
                }
            }
            $zip->close();
        }
        header('Content-Description: File Transfer');
        header("Content-type: application/zip"); 
        header("Content-Disposition: attachment; filename=$archive_file_name");
        header("Content-length: " . filesize($archive_file_name));
        header("Pragma: public"); 
        header("Expires: 0"); 
        readfile("$archive_file_name");
        unlink($archive_file_name);
        ob_clean();
        ob_end_flush();
        exit;
    }
    header("Location: /storage");
