<?php
include_once("../handlers/databaseHandler.php");
function createUser($newUser){
    $db = new Database();
    return $db->editDatabase("INSERT INTO user (userID, email, password, name, age, country, city, postcode, address, isAdmin) VALUES (NULL, :email, :password, :name, :age, :country, :city, :postcode, :address, 'user');", $newUser);
    


    /* INSERT INTO `user` (`userID`, `email`, `password`, `name`, `age`, `country`, `city`, `postcode`, `address`, `isAdmin`) VALUES (NULL, 'testar@test.se', '456', 'testarn', '1', 'testar', 'testar', '45445', 'test 1', 'user'); */
    
    /* $db = new Database();
    return $db->editDatabase("INSERT INTO user1 (userID, email, password, phoneNumber, age, address, country, city, postalCode, subscription) VALUES (NULL, :email, :password, :number, :age, :address, :country, :city, :postcode, 0);", $newUser); */

    
}