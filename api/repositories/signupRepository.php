<?php
include_once("../handlers/databaseHandler.php");
function createUser($newUser){
    /* hämtar ut "input" mailen */
    $inputEmail = $newUser['email'];
    $db = new Database();
    /* hämtar från databasen och kollar om någon email matchar  */
    $answerFromDb = $db->collectFromDatabase("SELECT email FROM user WHERE email = '$inputEmail';");
    /* om den skickar tillbaka en tom lista har den inte hittat en email som matchar ergo kolla efter tom lista.. och lägg till ny kund 
    i så fall */
    if(empty($answerFromDb)){
        /* "hashar" lösenordet i den associativa arrayen */
        $newUser['password'] = password_hash($newUser['password'], PASSWORD_DEFAULT);
        return $db->editDatabase("INSERT INTO user (userID, email, password, name, age, country, city, postcode, address, isAdmin) VALUES (NULL, :email, :password, :name, :age, :country, :city, :postcode, :address, 'user');", $newUser);
    }else{
        return "a user with this email already exists";
    }
    


      
}