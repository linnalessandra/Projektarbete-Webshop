<?php
class Shipping{
    function __construct(){
        include_once("../handlers/databaseHandler.php");
        $this->db = new Database();
    }
    public function getShippingMethod(){
        $resultFromDatabase = $this->db->collectFromDatabase("SELECT * FROM shipping;");
        return $resultFromDatabase;
    }
}