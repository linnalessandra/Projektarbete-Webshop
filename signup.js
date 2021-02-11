let signupButton = document.getElementById("signupBtn")
signupButton.addEventListener("click", async () =>{
    let newUser = {
        email: document.getElementById("email").value,
        password: document.getElementById("pwd").value,
        number: document.getElementById("number").value,
        age: document.getElementById("age").value,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        postcode: document.getElementById("postcode").value,
        address: document.getElementById("address").value,
    }
    let body = new FormData()
    body.append("newUser", JSON.stringify(newUser))

    let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
    console.log(result)
    emptyInput()
})

function emptyInput(){
    document.getElementById("email").value = "";
    document.getElementById("pwd").value = "";
    document.getElementById("number").value = "";
    document.getElementById("age").value = "";
    document.getElementById("country").value = "";
    document.getElementById("city").value = "";
    document.getElementById("postcode").value = "";
    document.getElementById("address").value = "";
}



async function makeRequest(url, inputMethod, body){
    try{
        let response = await fetch(url, {method: inputMethod, body})
        return response.json()
    }catch(error){
        console.log(error)
    }
}