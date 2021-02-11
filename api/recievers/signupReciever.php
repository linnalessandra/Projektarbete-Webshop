<?php
include_once("../handlers/databaseHandler.php");
function createUser($newUser){
    $db = new Database();
    return $db->editDatabase("INSERT INTO user1 (userID, email, password, phoneNumber, age, address, country, city, postalCode, subscription) VALUES (NULL, :email, :password, :number, :age, :address, :country, :city, :postcode, 0);", $newUser);

    /* $db = new Database();
    return $db->runQuery("INSERT INTO test (email, password) VALUES (:email, :password);", $newuser); */
}
if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["newUser"])){
        $newUser = json_decode($_POST["newUser"], true);
        echo json_encode(createUser($newUser));

    }
}else{
    echo json_encode("Not a valid request method..");
}
    