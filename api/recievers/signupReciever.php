<?php
include_once("../repositories/signupRepository.php");
if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["newUser"])){
        $newUser = json_decode($_POST["newUser"], true);
        echo json_encode(createUser($newUser));

    }
}else{
    echo json_encode("Not a valid request method..");
}
    