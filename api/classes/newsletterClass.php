<?php 
class Newsletter{
    function __construct(){
        include_once("../handlers/databaseHandler.php");
        $this->db = new Database();
    }
    public function newsletterSignup($promptEmail, $promptName) {
        $entity = [];
        /* $result = $this->db->editDatabase("INSERT INTO `newsletter_signup` (`promptEmail`, `promptName`) VALUES ('$promptEmail', '$promptName');", $entity); */
        $result = $this->db->editDatabase("INSERT INTO `newsletter` (`newsletterID`, `name`, `emailUser`, `userID`) VALUES (NULL, '$promptName', '$promptEmail', NULL);", $entity);
        return $result; 
    }
    public function getNewsletterSignupList(){
        $resultFromDb = $this->db->collectFromDatabase("SELECT * FROM newsletter;");
        return $resultFromDb;
    }
}