<?php
    $stat1 = file_get_contents('/proc/stat');
    sleep(1);
    $stat2 = file_get_contents('/proc/stat');

    $cpu1 = explode(' ', preg_replace('!\s+!', ' ', trim(explode("\n", $stat1)[0])));
    $cpu2 = explode(' ', preg_replace('!\s+!', ' ', trim(explode("\n", $stat2)[0])));

    $total1 = array_sum(array_slice($cpu1, 1, 7));
    $total2 = array_sum(array_slice($cpu2, 1, 7));

    $idle1 = (int)$cpu1[4];
    $idle2 = (int)$cpu2[4];

    $totalDiff = $total2 - $total1;
    $idleDiff = $idle2 - $idle1;

    if ($totalDiff == 0) {
        echo 0;
    } else {
        $usage = 100 * (1 - ($idleDiff / $totalDiff));

        echo round($usage, 2);
    }
    