window.addEventListener("load", initSite)
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

async function initSite() {
   const products = await makeRequest("./api/recievers/productReciever.php", "GET")
   showProducts(products)
   
}

/* visa produkterna på startsidan */
async function displayProducts() {
    const products = await makeRequest("./api/recievers/productReciever.php", "GET")
    
    //console.log(products)
}

function showProducts(products){
    /* console.log(products) */
    let computerDiv = document.getElementById("datorer")
    products.forEach(product => {
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
    productToCartButton.addEventListener("click",() => {
        let productToCart = {
            productID: product.productID, 
            productName: product.productName,
            productPrice: product.productPrice,
            productDescription: product.productDescription,
            imageSrc: product.imageSrc
        }
        console.log(productToCart)

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
    computerDiv.append(title, imageHolder, productDescription, productPrice, productToCartButton)

    });

}


async function newsletterPrompt() {
    var promptEmail = prompt("Skriv in din email:");
    var promptName = prompt("Skriv in ditt namn:")
    
    if (promptName == null || promptName == "") {
        console.log("Avbrytet.");
        alert("Du måste fylla i både namn och email för att kunna få nyhetsbrev.")
    } else if (promptEmail == null || promptEmail == "") {
        console.log("Avbrytet.");
        alert("Du måste fylla i både namn och email för att kunna få nyhetsbrev.")
    } else {
        alert("Välkommen " + promptName + "! Ett brev skickas nu till din mail.")
        console.log(promptEmail, promptName);

        let body = new FormData() 
        body.append("promptEmail", JSON.stringify(promptEmail));
        body.append("promptName", JSON.stringify(promptName));
        body.append("endpoint", "newsletterEndpoint");

        let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body);
        console.log(result);
        
    
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


/* let mainElement = document.getElementsByName("main")[0]

    productList.forEach(products => {
        let productCard = document.createElement("div")
        productCard.className

    }); */