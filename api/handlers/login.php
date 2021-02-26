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
                         $_SESSION["username"] = $_POST["username"];  
                         header("location:loginSuccess.php");
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
      </head>  
      <body>  

           <br />  
           <div class="container" style="width:500px;">  
                <?php  
                if(isset($message))  
                {  
                     echo '<label class="text-danger">'.$message.'</label>';  
                }  
                ?>  
                <h3 align="">Login</h3><br />  
                <form method="post">  
                     <label>Username</label>  
                     <input type="text" name="username"/>  
                     <br />  
                     <label>Password</label>  
                     <input type="password" name="password"/>  
                     <br />  
                     <input type="submit" name="login" value="Login" />  
                </form>  
           </div>  
           <br />  
      </body>  
</html>
