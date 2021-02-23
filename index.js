window.addEventListener("load", initSite)

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
    console.log(products)
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




/* async function deleteAllProducts() {

    const products = await makeRequest("./api/recievers/productReciever.php", "POST")
    console.log(products)
} */




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
