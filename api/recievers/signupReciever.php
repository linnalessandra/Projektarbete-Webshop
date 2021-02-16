<?php
include_once("../repositories/signupRepository.php");
if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["newUser"])){
        /* tar emot det som ett objekt, omvandlar till array genom att lägga till true */
        $newUser = json_decode($_POST["newUser"], true);
        echo json_encode(createUser($newUser));
        exit;
    }
}else{
    echo json_encode("Not a valid request method..");
}
    