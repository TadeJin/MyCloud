<?php
session_start();
if (!empty($_POST["openedDir"])) {
    $_SESSION["currentDir"] = htmlspecialchars($_POST["openedDir"]);
}

echo $_SESSION["currentDir"];
