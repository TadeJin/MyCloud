<?php
$free_space = disk_free_space("/mnt/HDD");
$free_space_gb = round($free_space / (1024 * 1024 * 1024),2);
                
if ($free_space_gb < 1) {
	$free_space_gb = round($free_space / (1024 * 1024),2) . " MB";
	} else {
	$free_space_gb = $free_space_gb . " GB";
}

echo $free_space_gb;
