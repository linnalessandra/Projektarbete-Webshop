window.addEventListener("load", initSite)
async function initSite() {
   checkIfLoggedIn()
   getUsersOrders()
   
}
async function checkIfLoggedIn(){
    let body = new FormData()
    body.append("endpoint", "checkLogin")
    let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body);
    console.log(result);
    if(result == true){
        let btnLogin = document.getElementById("btnLogin")
        btnLogin.innerText = "Logga ut";
        btnLogin.href = "./api/handlers/logout.php"
    }else{
        location.replace("index.html")
    }
}
async function getUsersOrders(){
    let orderHolder = document.getElementById("userOrders")
    let body = new FormData()
    body.append("endpoint", "getOrdersForUser")
    let response = await makeRequest("./api/recievers/orderReciever.php", "POST", body)
    console.log(response)
    if(response.length == 0){
        orderHolder.innerText = "Du har inga tidigare beställningar..."
        return
    }
    for (let i = 0; i < response.length; i++) {
        const order = response[i];
        console.log(order.orderDate)
        let innerDiv = document.createElement("div")
        innerDiv.style.display = "flex"
        innerDiv.style.flexDirection = "column"
        innerDiv.style.justifyContent = "space-evenly"
        innerDiv.style.margin = "10px"
        innerDiv.style.border = "1px solid #2e3295"
        innerDiv.style.padding = "10px"
        let orderDate = document.createElement("h3")
        orderDate.innerText = "Orderdatum: " + order.orderDate
        let quantity = document.createElement("h4")
        quantity.innerText = "Antal produkter: " + order.totalQuantity + " "
        let price = document.createElement("h4")
        price.innerText = "Totalkostnad: " + order.totalPrice
        let status = document.createElement("h4")
        status.innerText = "Status: beställd"
        innerDiv.append(orderDate, quantity, price, status)
        orderHolder.append(innerDiv)

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