<?php

    session_start();

    $output = array();
    exec("du -h /mnt/HDD/" . $_SESSION["user"],$output);

    $output = substr(explode("/",$output[0])[0],0,-1);

    echo $output . "B";