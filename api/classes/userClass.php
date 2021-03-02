<?php 

class User{
    function __construct(){
        include_once("../handlers/databaseHandler.php");
        $this->db = new Database();
    }
    public function getAllUsers(){
        $resultFromDatabase = $this->db->collectFromDatabase("SELECT * FROM user;");
        return $resultFromDatabase;
    }
    public function createUser($newUser){
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
    public function changeToAdmin($userID){
        $entity = [];
        $resultFromDatabase = $this->db->editDatabase("UPDATE `user` SET `isAdmin` = 'admin' WHERE `user`.`userID` = '$userID';", $entity);
        return $resultFromDatabase;
    }
    public function getUserID(){
        session_start();      
        $userLoggedIn = unserialize($_SESSION["username"]);
        $userID = $this->db->collectFromDatabase("SELECT `userID` FROM `user` WHERE `email` = '$userLoggedIn';");
        $userID = $userID[0]->userID;
        return $userID;
    }
}