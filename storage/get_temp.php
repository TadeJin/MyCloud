<?php
$temperatureFile = '/sys/class/thermal/thermal_zone0/temp';
if (file_exists($temperatureFile)) {
    $temp = file_get_contents($temperatureFile);
    $tempCelsius = round($temp / 1000, 1);
    echo $tempCelsius;
} else {
    echo "Error: Temperature file not found.";
}

