<?php 

class Newsletter{
    function __construct(){
        include_once("../handlers/databaseHandler.php");
        $this->db = new Database();
    }

    public function newsletterSignup($promptEmail, $promptName) {
        $quantity = [];
        $result = $this->db->editDatabase("INSERT INTO `newsletter_signup` (`promptEmail`, `promptName`) VALUES ($promptEmail, $promptName);", $quantity);
        return $result; 
    }
}