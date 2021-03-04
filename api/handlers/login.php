<?php  
session_start();  
include_once("databaseHandler.php");
$db = new Database();
try {  
     if (isset($_POST["login"])) {  
          if (empty($_POST["username"]) || empty($_POST["password"])) {  
               $message = '<label>Fyll i alla fält</label>';  
          } else {  
               $query = "SELECT password FROM user WHERE email = :username";  
               $hashedPasswordArray = $db->editDatabase($query, array('username'=>$_POST["username"]));

               if (count($hashedPasswordArray) == 0) {
                    $message = '<label>Fel användarnamn</label>';
               } else {
                    $passwordHash = $hashedPasswordArray[0]["password"];
                    
                    if (password_verify($_POST["password"], $passwordHash)) {
                         $_SESSION["username"] = serialize($_POST["username"]);  
                         $query2 = "SELECT isAdmin FROM user WHERE email = :username";  
                         $answer = $db->editDatabase($query2, array('username'=>$_POST["username"]));
                         if($answer[0]["isAdmin"] == "admin"){
                              $_SESSION["admin"] = true;
                              header("location:../../admin.html");
                              exit;
                         }else{
                              $_SESSION["admin"] = false;
                              header("location:loginSuccess.php");
                              exit;
                              
                         }           
                    } else {
                         $message = '<label>Antingen fel e-mail eller lösenord</label>';
                    }
               }
          }  
     }  
} catch(PDOException $error) {  
     $message = $error->getMessage();  
}  
?>

<!DOCTYPE html>  
 <html>  
      <head>  
           <title>Techaway | Login</title>
           <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="../../style/index.css">
<link rel="stylesheet" href="../../style/signup.css">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
      </head>  
      <body> 
      <nav class="navigation-bar">
    <div>
        <a href="../../index.html"> <img class="logo" src="../../otherImages/startLogo.png"> </a>
    </div>
    <div class="hello">
        <a href="../../cart.html"><i class="fas fa-shopping-cart"></i> Kundvagn</a>
        <a href="#contactFooter"><i class="fa fa-fw fa-envelope"></i> Kontakt</a>
     </div>
  </nav> 

           <br />  
           <div class="signupForm">  
                <?php  
                if(isset($message))  
                {  
                     echo '<label class="text-danger">'.$message.'</label>';  
                }  
                ?>  
                <h3 align="">Logga in:</h3><br />  
                <form class="loginForm" method="post">  
                     <label>Email</label>  
                     <input style="margin: 5px;"  type="text" name="username"/>  
                     <br />  
                     <label>Lösenord</label>  
                     <input style="margin: 5px;"  type="password" name="password"/>  
                     <br />  
                     <input class="buttonStyle" type="submit" name="login" value="Login" />  
                </form>  
                <a style="margin-top: 10px;" href="../../signup.html">Vill du bli medlem?</a>
           </div>  
           <br />  

           
      <footer class="contactFooter">
        <div class="footerContainer">
          <h2>Kontakta oss</h2>
          <p>Email: info@techaway.se</p>
          <p>Telefon: 031-337855</p>
        </div>
        <div class="infoFooter">
          <img src="./otherImages/startLogo.png" alt="">
        </div>
      </footer>
      </body>  
</html>
