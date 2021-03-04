<?php
class Product{
    function __construct(){
        include_once("../handlers/databaseHandler.php");
        $this->db = new Database();
    }
    public function getAllProducts(){
        $resultFromDb = $this->db->collectFromDatabase("SELECT * FROM product;");
        return $resultFromDb;
    }
    public function addNewProduct($newProduct){
        $resultFromDb = $this->db->editDatabase("INSERT INTO `product` (`productID`, `productName`, `productPrice`, `productDescription`, `manufacturer`, `unitsInStock`, `imageSrc`) VALUES (NULL, :productName, :productPrice, :productDescription, :manufacturer, :unitsInStock, :imageSrc);", $newProduct);
        return $resultFromDb;
    }
    public function removeProduct($productToRemove){
        $resultFromDb = $this->db->editDatabase("DELETE FROM `product` WHERE `productName` = :productName;", $productToRemove);
        return $resultFromDb;
    }
    public function getProductById($inputID){
        $inputID = intval($inputID);
        $resultFromDb = $this->db->collectFromDatabase("SELECT * FROM `product` WHERE `productID` = $inputID;");
        return $resultFromDb;
    }
    public function updateProduct($productToUpdate){
        $resultFromDb = $this->db->editDatabase("UPDATE `product` SET `productName` = :productName, `productPrice` = :productPrice, `productDescription` = :productDescription, `manufacturer` = :manufacturer, `unitsInStock` = :unitsInStock WHERE `product`.`productID` = :productID;", $productToUpdate);
        return $resultFromDb;
    }
    public function getProductByCategory($categoryID){
        $resultFromDb = $this->db->collectFromDatabase("SELECT productID FROM product_category_detail WHERE categoryID = '$categoryID';");
        $length = count($resultFromDb);
        $arrayOfProducts = array();
        for ($i=0; $i < $length; $i++) { 
            $productID = $resultFromDb[$i]->productID;
            $newResultList = $this->db->collectFromDatabase("SELECT * FROM product WHERE productID = '$productID';");
            array_push($arrayOfProducts, $newResultList[0]);
        }
        return $arrayOfProducts;  
    }
}