<?php
session_start();
if (!empty($_POST["openedDir"])) {
    $_SESSION["currentDir"] = $_POST["openedDir"];
}

echo $_SESSION["currentDir"];
