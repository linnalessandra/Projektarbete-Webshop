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
        /* skicka in shippingName ex Postnord så hämtas shippingID från databasen
    eftersom det ska in i order-tabellen */
    public function getShippingID($shippingName){
        $result = $this->db->collectFromDatabase("SELECT shippingID FROM shipping WHERE shippingName = '$shippingName';");
        /* när jag testade detta fick jag en array med ett objekt i tillbaka därför har jag sktivei som jag gjort nedanför */
        return $result;
        /* return $result[0]->shippingID; */
    }
}