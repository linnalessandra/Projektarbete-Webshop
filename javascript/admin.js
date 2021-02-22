let saveButton = document.getElementById("saveBtn").addEventListener("click", saveNewProduct);
let searchButton = document.getElementById("searchBtn").addEventListener("click", searchProduct);
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
    console.log(newProduct)
    let body = new FormData()
    body.append("newProduct", JSON.stringify(newProduct))
    body.append("endpoint", "saveNewProduct")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    console.log(response)
    saveImageInFolder()
    startOver()
}
async function saveImageInFolder(){
    let inputImage = document.getElementById("imageFile")
    let body = new FormData()
    body.append("image", inputImage.files[0])
    body.append("endpoint", "saveimage")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    console.log(response)
}
async function searchProduct(){
    let hideThis = document.getElementById("hide")
    let inputID = document.getElementById("inputID").value
    let body = new FormData()
    body.append("inputID", JSON.stringify(inputID))
    body.append("endpoint", "searchproduct")
    let result = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    let productToEditDiv = document.getElementById("productToEdit")
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
    console.log(productToUpdate)
    let data = new FormData()
    data.append("productToUpdate", JSON.stringify(productToUpdate))
    data.append("endpoint", "updateProduct")
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", data)
    console.log(response)
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
    console.log(response)
    startOver()
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