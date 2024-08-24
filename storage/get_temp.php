<?php
// Read CPU temperature from the file
$temperatureFile = '/sys/class/thermal/thermal_zone0/temp';
if (file_exists($temperatureFile)) {
    $temp = file_get_contents($temperatureFile);
    $tempCelsius = round($temp / 1000, 1); // Convert temperature to Celsius
    echo $tempCelsius;
} else {
    echo "Error: Temperature file not found.";
}

