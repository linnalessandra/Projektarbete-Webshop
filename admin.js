let saveButton = document.getElementById("saveBtn").addEventListener("click", saveNewProduct);

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
}


async function saveImageInFolder(){
    let inputImage = document.getElementById("imageFile")
    let body = new FormData()
    body.append("image", inputImage.files[0])
    body.append("endpoint", "saveimage")
    /* skapa ett endpoint i productreciever som skickar bilden till imagehandler.. */
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    console.log(response)
}
/* async function saveImage(){
    console.log("jaa")
    let inputImage = document.getElementById("imageFile")
    let body = new FormData()
    body.append("image", inputImage.files[0])
    body.append("endpoint", "saveimage")
    console.log(body)
    let response = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    console.log(response)
} */



async function makeRequest(url, inputMethod, body){
    try{
        let response = await fetch(url, {method: inputMethod, body})
        return response.json()
    }catch(error){
        console.log(error)
    }
}