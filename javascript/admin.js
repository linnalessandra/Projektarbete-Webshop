window.addEventListener("load", initiate)
let saveButton = document.getElementById("saveBtn").addEventListener("click", saveNewProduct);
let searchButton = document.getElementById("searchBtn").addEventListener("click", searchProduct);
function initiate(){
    getOrders()
    checkIfAdmin()
}
async function checkIfAdmin(){
    let body = new FormData()
    body.append("endpoint", "checkIfAdmin")
    let response = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
    if(response == false){
        location.replace("http://localhost/Projektarbete-Webshop/index.html");
    }
}
async function saveNewProduct(){
    let inputImage = document.getElementById("imageFile").value
    inputImage = inputImage.replace(/.*[\/\\]/, '')
    let newProduct = {
        productName: document.getElementById("productName").value,
        productPrice: document.getElementById("productPrice").value,
        manufacturer: document.getElementById("manufacturer").value,
        unitsInStock: document.getElementById("unitsInStock").value,
        imageSrc: inputImage,
        productDescription: document.getElementById("productDescription").value
    }
    let body = new FormData()
    body.append("newProduct", JSON.stringify(newProduct))
    body.append("endpoint", "saveNewProduct")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    saveImageInFolder()
    startOver()
}
async function saveImageInFolder(){
    let inputImage = document.getElementById("imageFile")
    let body = new FormData()
    body.append("image", inputImage.files[0])
    body.append("endpoint", "saveimage")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", body)
}
async function searchProduct(){
    let hideThis = document.getElementById("hide")
    let inputID = document.getElementById("inputID").value
    let productToEditDiv = document.getElementById("productToEdit")
    let body = new FormData()
    body.append("inputID", JSON.stringify(inputID))
    body.append("endpoint", "searchproduct")
    let result = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    if(result.length == 0){
        productToEditDiv.innerText = "No product with that ID exists.."
        return
    }
    productToEditDiv.classList.add("addProductWrapper")
    let labelName = document.createElement("label")
    labelName.innerText = "Product name:"
    let inputName = document.createElement("input")
    inputName.value = result[0].productName
    inputName.id = "inputName"
    let labelPrice = document.createElement("label")
    labelPrice.innerText = "Price:"
    let inputPrice = document.createElement("input")
    inputPrice.value = result[0].productPrice
    inputPrice.id = "inputPrice"
    let labelManufacturer = document.createElement("label")
    labelManufacturer.innerText = "Manufacturer:"
    let inputManufacturer = document.createElement("input")
    inputManufacturer.value = result[0].manufacturer
    inputManufacturer.id = "inputManufacturer"
    let labelUnitsInStock = document.createElement("label")
    labelUnitsInStock.innerText = "Units in stock:"
    let inputUnitsInStock = document.createElement("input")
    inputUnitsInStock.value = result[0].unitsInStock
    inputUnitsInStock.id = "inputUnitsInStock"
    let labelDescription = document.createElement("label")
    labelDescription.innerText = "Description:"
    let inputDescription = document.createElement("textarea")
    inputDescription.value = result[0].productDescription
    inputDescription.id = "inputDescription"
    let updateButton = document.createElement("button")
    updateButton.innerText = "Save changes"
    updateButton.addEventListener("click", updateProduct)
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete product"
    deleteButton.addEventListener("click", deleteProduct)
    hideThis.style.display = "none"
    productToEditDiv.append(labelName, inputName, labelPrice, inputPrice, labelManufacturer, inputManufacturer, labelUnitsInStock, inputUnitsInStock, inputDescription, updateButton, deleteButton)
}
async function updateProduct(){
    let inputID = document.getElementById("inputID").value
    let productToUpdate = {
        productID: inputID,
        productName: document.getElementById("inputName").value,
        productPrice: document.getElementById("inputPrice").value,
        manufacturer: document.getElementById("inputManufacturer").value,
        unitsInStock: document.getElementById("inputUnitsInStock").value,
        productDescription: document.getElementById("inputDescription").value
    }
    let data = new FormData()
    data.append("productToUpdate", JSON.stringify(productToUpdate))
    data.append("endpoint", "updateProduct")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", data)
    startOver()
}
async function deleteProduct(){
    let productToDelete = {
        productName: document.getElementById("inputName").value,
    }
    let data = new FormData()
    data.append("productToDelete", JSON.stringify(productToDelete))
    data.append("endpoint", "deleteProduct")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", data)
    startOver()
}
async function getOrders(){
    let orderHolder = document.getElementById("orders")
    let body = new FormData()
    body.append("endpoint", "getOrders")
    let response = await makeRequest("./api/recievers/orderReciever.php", "POST", body)
    if(response.length == 0){
        orderHolder.innerText = "Det finns inga ordrar.."
        return
    }
    let table = document.createElement("table")
    let rubrikerna = document.createElement("tr")
    let headers = Object.keys(response[0])
    /* headers = headers.slice(1, 3) */
    headers.forEach((header) =>{
        let headerElement = document.createElement("th")
        headerElement.innerText = header 
        rubrikerna.appendChild(headerElement)
    })
    table.appendChild(rubrikerna)
    response.forEach((signup) =>{
        let signupRow = document.createElement("tr")
        headers.forEach((header) =>{
            let content = document.createElement("td")
            content.innerText = signup[header]
            signupRow.appendChild(content)
        })
        table.appendChild(signupRow)
    })
    orderHolder.appendChild(table)
}
function startOver(){
    location.reload()  
}
async function makeRequest(url, inputMethod, body){
    try{
        let response = await fetch(url, {method: inputMethod, body})
        return response.json()
    }catch(error){
        console.log(error)
    }
}