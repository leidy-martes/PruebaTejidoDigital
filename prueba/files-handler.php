<?php

$uploadDir = "uploads";

$filesInput = $_FILES['files'];
$filesName = $filesInput['name'];
$filesTmpName = $filesInput['tmp_name'];
$filesError = $filesInput['error'];
$ext = strtolower(pathinfo($filesName, PATHINFO_EXTENSION));

if($ext == 'jpg' ) 
{ 
    if ($filesError == UPLOAD_ERR_OK) {
        try {
            $toPath = $uploadDir."/".uniqid() . '_' . $filesName;
            $uploaded = move_uploaded_file($filesTmpName , $toPath);
            echo json_encode(array("exito"=> true,"mensaje"=> "Cargado correctamente"));
        } catch (Exception $e) {
            echo json_encode(array("exito"=> false,"mensaje"=> $e->getMessage()));
        }
    }
}else{
    echo json_encode(array("exito"=> false,"mensaje"=> "El formato no es valido, solo se permiten JPG"));
}

