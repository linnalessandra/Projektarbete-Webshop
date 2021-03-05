window.addEventListener("load", initSite)
async function initSite() {
   const products = await makeRequest("./api/recievers/productReciever.php", "GET")
   showProducts(products)
   checkIfLoggedIn()  
}
let categoryPhone = document.getElementById("phone")
categoryPhone.addEventListener("click", async ()=>{
    let computerDiv = document.getElementById("datorer").innerHTML = " ";
    let body = new FormData()
    body.append("endpoint", "getProductByCategory")
    body.append("categoryID", 4)
    const products = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    showProducts(products)
})
let categoryComputer = document.getElementById("computer")
categoryComputer.addEventListener("click", async ()=>{
    let computerDiv = document.getElementById("datorer").innerHTML = " ";
    let body = new FormData()
    body.append("endpoint", "getProductByCategory")
    body.append("categoryID", 1)
    const products = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    showProducts(products)
})
let categoryPlattor = document.getElementById("plattor")
categoryPlattor.addEventListener("click", async ()=>{
    let computerDiv = document.getElementById("datorer").innerHTML = " ";
    let body = new FormData()
    body.append("endpoint", "getProductByCategory")
    body.append("categoryID", 2)
    const products = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    showProducts(products)
})
let categorySound = document.getElementById("sound")
categorySound.addEventListener("click", async ()=>{
    let computerDiv = document.getElementById("datorer").innerHTML = " ";
    let body = new FormData()
    body.append("endpoint", "getProductByCategory")
    body.append("categoryID", 3)
    const products = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    showProducts(products)
})
function showProducts(products){
    let computerDiv = document.getElementById("datorer")
    computerDiv.style.display = "flex"
    computerDiv.style.flexDirection = "row"
    computerDiv.style.flexWrap = "wrap"
    computerDiv.style.justifyContent = "center"
    products.forEach(product => {
    let holder = document.createElement("div")
    let title = document.createElement("h2")
    title.innerText = product.productName
    let imageHolder = document.createElement("div")
    imageHolder.classList.add("imageHolder")
    imageHolder.innerHTML = "<img src='" + "./productImages/" + product.imageSrc + "'>"
    let productDescription = document.createElement("p")
    productDescription.innerText = product.productDescription
    let productPrice = document.createElement("h3")
    productPrice.innerText = product.productPrice + " kr" 
    let productToCartButton = document.createElement("button")
    productToCartButton.innerText = "Lägg till i kundvagn"
    holder.append(title, imageHolder, productDescription, productPrice, productToCartButton)
    holder.classList.add("holder");  
    productToCartButton.addEventListener("click",() => {
        let productToCart = {
            productID: product.productID, 
            productName: product.productName,
            productPrice: product.productPrice,
            productDescription: product.productDescription,
            imageSrc: product.imageSrc
        }
        let currentCart = localStorage.getItem("cart") 
        currentCart = JSON.parse(currentCart)
        if(currentCart == null ) {
            currentCart = []
        }

        let foundIndex = currentCart.findIndex((cartItem) => {
            return cartItem.product.productID == productToCart.productID
        })
        if(foundIndex != -1) {
            currentCart[foundIndex].quantity++
        } else {
            currentCart.push({
                product: productToCart, 
                quantity: 1
            })
        }      
        localStorage.setItem("cart", JSON.stringify(currentCart))
    } )
    computerDiv.appendChild(holder)
    });
}
function checkIfValidEmail(promptEmail){
    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(promptEmail.match(format)){
        return true;
    }else{
        return false;
    }
}
async function newsletterPrompt() {
    var promptEmail = prompt("Skriv in din email:");
    var promptName = prompt("Skriv in ditt namn:");
    let isEmailTrue = checkIfValidEmail(promptEmail)
    if(!isEmailTrue){
        alert("Not a valid email!");
        return;
    }     
    if (promptName == null || promptName == "") {
        alert("Du måste fylla i både namn och email för att kunna få nyhetsbrev.")
    } else if (promptEmail == null || promptEmail == "") {
        alert("Du måste fylla i både namn och email för att kunna få nyhetsbrev.")
    } else {
        alert("Välkommen " + promptName + "! Ett brev skickas nu till din mail.")
        let body = new FormData() 
        body.append("promptEmail", JSON.stringify(promptEmail));
        body.append("promptName", JSON.stringify(promptName));
        body.append("endpoint", "newsletterEndpoint");
        let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body);  
    }
  }
async function checkIfLoggedIn(){
    let body = new FormData()
    body.append("endpoint", "checkLogin")
    let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body);
    if(result == true){
        let btnLogin = document.getElementById("btnLogin")
        btnLogin.innerText = "Logga ut";
        btnLogin.href = "./api/handlers/logout.php"
        let contactBtn = document.getElementById("contact")
        contactBtn.innerText = "Se tidigare ordrar";
        contactBtn.href = "orders.html"
    }else{
        return false
    }
}
async function makeRequest(url, requestMethod, body) {
    try {
    const response = await fetch(url, {
        method: requestMethod,
        body
    })
    return response.json()
    } catch(err) {
    console.error(err)
    }
}
