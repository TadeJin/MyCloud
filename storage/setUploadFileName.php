<?php

session_start();


$_SESSION["uploadFileName"] = htmlspecialchars($_POST["fileName"]);