<?php
function addProductImage($inputImage){
    $target_dir = "../../productImages/";
    $target_file = $target_dir . basename($inputImage["name"]);
    $check = getimagesize($inputImage["tmp_name"]);
    if(!$check){
        return "This is not an image";
    }
    if(file_exists($target_file)){
        return "This file alreade exists";
    }
    if($inputImage["size"] > 5000000){
        return "File is to large";
    }
    if(move_uploaded_file($inputImage["tmp_name"], $target_file)){
        return "The image was saved";
    }else{
        return "Something went wrong";
    }

}