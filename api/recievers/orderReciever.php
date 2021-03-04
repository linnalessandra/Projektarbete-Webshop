<?php
include_once("../classes/orderClass.php");
include_once("../classes/shippingClass.php");
include_once("../classes/userClass.php");
include_once("../handlers/databaseHandler.php");
try{
    if(isset($_SERVER["REQUEST_METHOD"])){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["endpoint"] == "createOrder"){
                $user = new User();
                $userID = $user->getUserID();               
                $order = new Order();
                $productInCart = json_decode($_POST["productsToOrder"], true);
                $shippingMethod = json_decode($_POST["shippingMethod"]);
                $shippingMethod = intval($shippingMethod);
                
                /* kör de olika funktionerna och sparar i olika variabler
                det vi behöver när vi sparar en order i databasen, har döpt
                variablerna efter kolumn-namnen */
                $orderDate = $order->orderDate();              
                $totalPrice = $order->totalPrice($productInCart);               
                $totalQuantity = $order->getQuantity($productInCart);               
                $updatingUnitsInStock = $order->updateUnitsInStock($productInCart);
                $orderID = $order->saveOrder($orderDate, $totalPrice, $totalQuantity, $shippingMethod, $userID);
                $testar = $order->saveDetails($productInCart, $orderID);
                echo json_encode($testar);
                exit;
            }if($_POST["endpoint"] == "getOrders"){
                $order = new Order();
                echo json_encode($order->getOrdersFromDb());
                exit;
            }if($_POST["endpoint"] == "getOrdersForUser"){
                $user = new User();
                $order = new Order();
                $userID = $user->getUserID();
                echo json_encode($order->getOrderForUser($userID));
                exit;
            }
        }else if($_SERVER["REQUEST_METHOD"] == "GET"){
            /* skicka en get request hit för att hämta shipping methods */
            $shipping = new Shipping();
            $resultFromDatabase = $shipping->getShippingMethod();
            echo json_encode($resultFromDatabase);
            exit;
        }
    }else{
        throw new Exception("No requst method was set..");
        exit;
    }

}catch(Exception $e){
    echo json_encode("false");
}