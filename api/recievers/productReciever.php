<?php
include_once("../classes/productClass.php");
include_once("../handlers/imageHandler.php");
try {
    if (isset($_SERVER["REQUEST_METHOD"])) {
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $product = new Product();
            echo json_encode($product->getAllProducts());
        } else if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($_POST["endpoint"] == "saveNewProduct") {
                    /* tar emot det som ett objekt, omvandlar till array genom att lägga till true */
                    $newProduct = json_decode($_POST["newProduct"], true);
                    $products = new Product();
                    $resultFromDatabase = $products->addNewProduct($newProduct);
                    echo json_encode($resultFromDatabase);
                    exit;             
            } if($_POST["endpoint"] == "saveimage") {         
                echo json_encode(addProductImage($_FILES["image"]));
                exit;
            } if($_POST["endpoint"] == "searchproduct") { 
               $inputID = json_decode($_POST["inputID"]);
               $product = new Product();        
                echo json_encode($product->getProductById($inputID));
                exit;
            } if($_POST["endpoint"] == "updateProduct") {
                $productToUpdate = json_decode($_POST["productToUpdate"], true);
                $product = new Product();        
                 echo json_encode($product->updateProduct($productToUpdate));
                 exit;
             }if($_POST["endpoint"] == "deleteProduct") {
                $productToDelete = json_decode($_POST["productToDelete"], true);
                $product = new Product();        
                 echo json_encode($product->removeProduct($productToDelete));
                 exit;
             }if($_POST["endpoint"] == "getProductByCategory"){
                 $categoryID = json_decode($_POST["categoryID"]);
                 $product = new Product();
                echo json_encode($product->getProductByCategory($categoryID));
                exit;
             }
        }
    }
} catch(Exception $e) {
    http_response_code($e->getCode());
    echo json_encode(array("status"=> $e-> getCode(), "Message" => $e->getMessage()));
}

