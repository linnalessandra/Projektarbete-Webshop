window.addEventListener("load", initSite)

async function initSite() {
   const products = await makeRequest("./api/recievers/orderReciever.php", "GET")
   getCartProducts();
   updateCartTotal();
   checkIfLoggedIn();
}


 async function deleteOneProduct() {
// för att ta bort EN produkt, onclick
    const products = await makeRequest("./api/recievers/productReciever.php", "POST")
    console.log(products)
} 


async function ShowProductsInCart(chosedProducts) {

    let container = document.getElementById("cartProducts")
    container.style.display = "flex"
    container.style.justifyContent = "center"
    container.style.flexDirection = "row"
    container.style.flexWrap = "wrap"



    for (let i = 0; i < chosedProducts.length; i++) {
        const product = chosedProducts[i];
        const productIndex = i;


        let productCard = document.createElement("div")
        productCard.classList.add("productCard")
        productCard.style.display = "flex"
        productCard.style.justifyContent = "space-between"
        productCard.style.padding = "8px"
        productCard.style.backgroundColor = "whitesmoke"
        productCard.style.margin = "10px"
        productCard.style.alignItems = "center"
        productCard.style.flexWrap = "wrap"
        productCard.style.height = "auto"
        productCard.style.width = "95%"



        let imageHolder = document.createElement("div")
        imageHolder.classList.add("imageHolder")
        imageHolder.innerHTML = "<img src='" + "./productImages/" + product.product.imageSrc + "'>" 

        productCard.appendChild(imageHolder);


        let productTitle = document.createElement("h2")
        productTitle.innerText = product.product.productName;
        productTitle.style.fontSize = "18px"

        productCard.appendChild(productTitle);



        let productPrice = document.createElement("h3")
        productPrice.innerText = product.product.productPrice + " kr" 
       
        productCard.appendChild(productPrice);

        let itemButton = document.createElement("button")
        itemButton.style.width = "30px"
        itemButton.style.backgroundColor = "whitesmoke"
        itemButton.style.color = "darkgray"
        itemButton.style.borderColor = "whitesmoke"
        itemButton.style.padding = "0px"
        itemButton.style.marginRight = "8px"
        itemButton.style.border = "solid 2px"
        itemButton.dataset.productIndex = productIndex 
 
        itemButton.addEventListener("click", e => {
           chosedProducts.splice(i, 1);
           localStorage.setItem("cart", JSON.stringify(chosedProducts));
           location.reload();

        })

        productCard.appendChild(itemButton);


        let itemIcon = document.createElement("i")
        itemIcon.classList.add("fas", "fa-trash-alt")
        itemIcon.style.padding = "5px"

        itemButton.appendChild(itemIcon)


        let itemSpan = document.createElement("span")


        itemButton.appendChild(itemSpan)

        let quantityCount = document.createElement("div")
        quantityCount.style.marginTop = "10px"
        quantityCount.style.display = "flex"
        quantityCount.style.justifyContent = "space-evenly"
        productCard.appendChild(quantityCount)

        quantityCount.appendChild(itemButton)

        let quantityItem = document.createElement("div")
        quantityItem.innerText = "Antal: " + product.quantity;
        quantityItem.style.display = "flex"
        quantityItem.style.justifyContent = "center"
        quantityItem.style.alignItems = "center"
        quantityItem.style.marginLeft = "8px"
        quantityItem.style.color = "gray"
        
        quantityCount.appendChild(quantityItem);

        container.appendChild(productCard);
        
    } 
}

var currentShoppingcart=JSON.parse(localStorage.getItem("cart"))

function updateCartTotal(){
    let totalPrice = document.getElementById("totalPrice")
    totalPrice.style.display = "flex"
    totalPrice.style.justifyContent = "center"
    totalPrice.style.marginTop = "20px"


    let price = 0
    for (let i = 0; i < currentShoppingcart.length; i++) {
        let productPrice = Number(currentShoppingcart[i].product.productPrice);
        if(currentShoppingcart !=null){
            price += productPrice

        } else if(currentShoppingcart == 0){
            price = 0 
        }
        totalPrice.innerHTML = "Totalt pris: " + price + " kr"   
    }
}


async function getShipping() {
    const result = await makeRequest("./api/recievers/orderReciever.php", "GET")

    let shippingTitle = document.createElement("h3")
    shippingTitle.innerText = "Välj fraktmetod:"  
    shippingTitle.style.fontSize = "25px"
    
    let shippingHolder = document.getElementById("shipping")
    shippingHolder.style.display = "flex"
    shippingHolder.style.justifyContent = "center"
    shippingHolder.style.flexDirection = "column"
    shippingHolder.style.alignItems = "center"
    shippingHolder.style.marginTop = "30px"
    
    shippingHolder.appendChild(shippingTitle)

    let newButton = document.createElement("button")
    newButton.innerText = "Slutför din beställning"
    newButton.addEventListener("click", endOrder)
    newButton.id = "endOrderButton"
    let ButtonHolder = document.getElementById("endButton")
    ButtonHolder.appendChild(newButton)
    



    let label1 = document.createElement("label")
    label1.innerText = result[0].shippingName
    let shippingOne = document.createElement("input")
    shippingOne.id = result[0].shippingID
    shippingOne.type = "checkbox"
    let label2 = document.createElement("label")
    label2.innerText = result[1].shippingName
    let shippingTwo = document.createElement("input")
    shippingTwo.id = result[1].shippingID
    shippingTwo.type = "checkbox"
    let label3 = document.createElement("label")
    label3.innerText = result[2].shippingName
    let shippingThree = document.createElement("input")
    shippingThree.id = result[2].shippingID
    shippingThree.type = "checkbox"
    shippingHolder.append(label1, shippingOne, label2, shippingTwo, label3, shippingThree)

    

}


async function endOrder() {

    let shippingMethod = null
    let postnord = document.getElementById("1")
    let dhl = document.getElementById("2")
    let brevduva = document.getElementById("3")

    console.log("hejsan")
    if(postnord.checked && dhl.checked && brevduva.checked){
        let shipDiv = document.getElementById("shipOption")
        shipDiv.innerText = "Välj ett fraktalternativ"
        shipDiv.style.fontSize = "15px"
        shipDiv.style.display = "flex"
        shipDiv.style.justifyContent = "center"
        shipDiv.style.marginBottom = "20px"
        console.log("du måste välja ett frakt alternativ")
        return
    }else if(postnord.checked && dhl.checked){
        let shipDiv = document.getElementById("shipOption")
        shipDiv.innerText = "Välj ett fraktalternativ"
        shipDiv.style.fontSize = "15px"
        shipDiv.style.display = "flex"
        shipDiv.style.justifyContent = "center"
        shipDiv.style.marginBottom = "20px"
        console.log("du måste välja ett frakt alternativ")
        return
        
    }else if(dhl.checked && brevduva.checked){
        let shipDiv = document.getElementById("shipOption")
        shipDiv.innerText = "Välj ett fraktalternativ"
        shipDiv.style.fontSize = "15px"
        shipDiv.style.display = "flex"
        shipDiv.style.justifyContent = "center"
        shipDiv.style.marginBottom = "20px"
        console.log("du måste välja ett frakt alternativ")
        return
        
    }else if(postnord.checked && brevduva.checked){
        let shipDiv = document.getElementById("shipOption")
        shipDiv.innerText = "Välj ett fraktalternativ"
        shipDiv.style.fontSize = "15px"
        shipDiv.style.display = "flex"
        shipDiv.style.justifyContent = "center"
        shipDiv.style.marginBottom = "20px"
        console.log("du måste välja ett frakt alternativ")
        return

    }else if(!postnord.checked && !brevduva.checked && !dhl.checked){
        let shipDiv = document.getElementById("shipOption")
        shipDiv.innerText = "Välj ett fraktalternativ"
        shipDiv.style.fontSize = "15px"
        shipDiv.style.display = "flex"
        shipDiv.style.justifyContent = "center"
        shipDiv.style.marginBottom = "20px"
        console.log("du måste välja ett frakt alternativ")
        return

    }else if(postnord.checked){
        shippingMethod = postnord.id
        
    }else if(dhl.checked){
        shippingMethod = dhl.id
        
    }else if(brevduva.checked){
        shippingMethod = brevduva.id
    }
    let checkLogin = await checkIfLoggedIn();
    if(checkLogin == false){
        alert("Logga in för att lägga en beställning!")
        location.replace("http://localhost/Projektarbete-Webshop/api/handlers/login.php")
        return
    }
    let currentCart = localStorage.getItem("cart")
    currentCart = JSON.parse(currentCart)
    let body = new FormData()
    body.append("productsToOrder", JSON.stringify(currentCart))
    body.append("shippingMethod", JSON.stringify(shippingMethod))
    body.append("endpoint", "createOrder")
    let response = await makeRequest("./api/recievers/orderReciever.php", "POST", body)
    emptyCart()
    let shipDiv = document.getElementById("shipOption")
        shipDiv.innerText = " "
}


async function getCartProducts() {
    
    let chosedProducts = localStorage.getItem("cart");
    chosedProducts = JSON.parse(chosedProducts);
    let container = document.getElementById("cartProducts")

    
    if (chosedProducts.length == 0) {
        let emptyCartTitle = document.createElement("p")
        container.style.display = "flex"
        container.style.justifyContent = "center"
        emptyCartTitle.innerText = "Kundvagnen är tom..."
        container.append(emptyCartTitle);
        return
        
    } else {
        ShowProductsInCart(chosedProducts);
        getShipping();
        
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

    }else{
        return false
    }
}

function emptyCart(){
    console.log("töm kundvagn")
    let container = document.getElementById("cartProducts").innerHTML = " "
    let totalPrice = document.getElementById("totalPrice").innerHTML = " "
    let shippingHolder = document.getElementById("shipping").innerHTML = " "
    let ButtonHolder = document.getElementById("endButton").innerHTML = " "
    
    let chosedProducts = localStorage.getItem("cart");
    JSON.parse(chosedProducts)
    chosedProducts = [];
    localStorage.setItem("cart", JSON.stringify(chosedProducts))
    getCartProducts()
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
