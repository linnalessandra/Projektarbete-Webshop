<?php
class Order{
    function __construct(){
        include_once("../handlers/databaseHandler.php");
        $this->db = new Database();
    }
    /* Skicka in lista på det som ligger i cart obs tänk på att alla "nycklar" 
    heter som i databasen så blir det enklare för oss, kolla att det är en array som skickas in först!! 
    */
    public function getQuantity($productsInCart){
        return count($productsInCart);
    }
    /* skicka in samma lista med produkter för att få totalpris*/
    public function totalPrice($productsInCart){
        $prices = [];
        $length = count($productsInCart);
        for ($i=0; $i < $length; $i++) { 
            $productPrice = intval($productsInCart[$i]["productPrice"]);
            array_push($prices, $productPrice);
        }
        return array_sum($prices);
    }
    /* skicka in shippingName ex Postnord så hämtas shippingID från databasen
    eftersom det ska in i order-tabellen */
    public function getShippingID($shippingName){
        $result = $this->db->collectFromDatabase("SELECT shippingID FROM shipping WHERE shippingName = '$shippingName';");
        /* när jag testade detta fick jag en array med ett objekt i tillbaka därför har jag sktivei som jag gjort nedanför */
        return $result[0]->shippingID;
    }
    public function orderDate(){
        return date("Y-m-d");
    }
    /* dessa skicka vi in för att matcha kolumnerna i tabellen order för att få allt detta använder vi oss av funtionerna ovan */
    public function saveOrder($orderDate, $totalPrice, $totalQuantity, $shippingID, $userMakingOrder){
        /* här skickar vi in allt i databasen!  */
        /* raden nedan om $userMakingOrder (i denna variebel har vi hämtat allt om kunden från databasen 
        tänker jag..) är en array med ett objekt i... */
        $userID = $userMakingOrder[0]->userID;
        $entity = [];
        $result = $this->db->editDatabase("INSERT INTO `order` (`orderID`, `orderDate`, `totalPrice`, `totalQuantity`, `shippingID`, `userID`) VALUES (NULL, '$orderDate', '$totalPrice', '$totalQuantity', '$shippingID', '$userID');", $entity);
        return $result;
    }
    /* uppdaterar lagersaldot */
    public function updateUnitsInStock($productsInCart){
        $entity = [];
        $cartLength = count($productsInCart);
        for ($i=0; $i < $cartLength; $i++) { 
            $productID = $productsInCart[$i]["product"]["productID"];
            $Antal = intval($productsInCart[$i]["quantity"]);
            $result = $this->db->editDatabase("UPDATE `product` SET `unitsInStock` = (SELECT `unitsInStock` - '$Antal') WHERE `product`.`productID` = '$productID';", $entity);
        }
    }
}