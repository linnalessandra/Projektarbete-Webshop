<?php
include_once("../classes/newsletterClass.php");
include_once("../classes/userClass.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["newUser"])){
        $newUser = json_decode($_POST["newUser"], true);
        $user = new User();
        echo json_encode($user->createUser($newUser));
        exit;
    } if($_POST["endpoint"] == "newsletterEndpoint") {
        $promptEmail = json_decode($_POST["promptEmail"]);
        $promptName = json_decode($_POST["promptName"]);
        $newsletter = new Newsletter();
        echo json_encode($newsletter->newsletterSignup($promptEmail, $promptName));
        exit;
    }if($_POST["endpoint"] == "getNewsletterCustomers") {
        $newsletter = new Newsletter();
        echo json_encode($newsletter->getNewsletterSignupList());
        exit;
    }if($_POST["endpoint"] == "checkIfAdmin") {
        session_start();
        if(isset($_SESSION["admin"])){
            if($_SESSION["admin"] == true){
                echo json_encode(true);
                exit;
            }else{
                echo json_encode(false);
                exit;
            }
        }else{
            echo json_encode(false);
            exit;
        }
    }if($_POST["endpoint"] == "checkLogin") {
        session_start();
        if(isset($_SESSION["username"])){
            echo json_encode(true);
            exit;
        }else{
            echo json_encode(false);
            exit;
        }
    }if($_POST["endpoint"] == "getAllUsers") {
        $user = new User();

       echo json_encode($user->getAllUsers());
       exit;
    }if($_POST["endpoint"] == "changeToAdmin") {
        $userID = json_decode($_POST["userID"]);
        $user = new User();

       echo json_encode($user->changeToAdmin($userID));
       /* echo json_encode("hejASDMIN" . $userID); */
       exit;
    }
} else{
    echo json_encode("Not a valid request method..");
}
    