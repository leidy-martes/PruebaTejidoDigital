<?php

$imgs = dir('uploads');
while (($img = $imgs->read()) !== false){
	if(preg_match('/jpg/',$img)){
		echo "<img src='uploads/$img'>";
	}
}