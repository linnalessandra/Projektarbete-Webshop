let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("pwd")
let nameInput = document.getElementById("name")
let ageInput = document.getElementById("age")
let countryInput = document.getElementById("country")
let cityInput = document.getElementById("city")
let postcodeInput = document.getElementById("postcode")
let addressInput = document.getElementById("address")


let signupButton = document.getElementById("signupBtn")
signupButton.addEventListener("click", async () =>{

    let newUser = {
        email: document.getElementById("email").value,
        password: document.getElementById("pwd").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        postcode: document.getElementById("postcode").value,
        address: document.getElementById("address").value,
        /* currentPosition: "user" */
    }
    if(newUser.email == ""){
        alert("Please fill all the required fields")
        emailInput.classList.add("warning")
        return
    }else if(newUser.email != ""){
        emailInput.classList.remove("warning")
    }
    if(newUser.password == ""){
        alert("Please fill all the required fields")
        passwordInput.classList.add("warning")
        return
    }else if(newUser.password != ""){
        passwordInput.classList.remove("warning")
    }
    if(newUser.name == ""){
        alert("Please fill all the required fields")
        nameInput.classList.add("warning")
        return
    }else if(newUser.name != ""){
        nameInput.classList.remove("warning")
        
    }
    if(newUser.age == ""){
        alert("Please fill all the required fields")
        ageInput.classList.add("warning")
        return
    }else if(newUser.age != ""){
        ageInput.classList.remove("warning")
    }
    if(newUser.country == ""){
        alert("Please fill all the required fields")
        countryInput.classList.add("warning")
        return
    }else if(newUser.country != ""){
        countryInput.classList.remove("warning")
    }
    if(newUser.city == ""){
        alert("Please fill all the required fields")
        cityInput.classList.add("warning")
        return
    }else if(newUser.city != ""){
        cityInput.classList.remove("warning")
    }
    if(newUser.postcode == ""){
        alert("Please fill all the required fields")
        postcodeInput.classList.add("warning")
        return
    }else if(newUser.postcode != ""){
        postcodeInput.classList.remove("warning")
    }
    if(newUser.address == ""){
        alert("Please fill all the required fields")
        addressInput.classList.add("warning")
        return
    }else if(newUser.address != ""){
        addressInput.classList.remove("warning")
    }
    let isEmailTrue = checkIfValidEmail(emailInput)
    if(isEmailTrue){
        console.log(newUser)
        let body = new FormData()
        body.append("newUser", JSON.stringify(newUser))
    
        let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
        emptyInput()
    }else{
        alert("Not a valid email!");
    }
})
function checkIfValidEmail(emailInput){
    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailInput.value.match(format)){
        return true;
    }else{
        return false;
    }


}

function emptyInput(){
    document.getElementById("email").value = "";
    document.getElementById("pwd").value = "";
    document.getElementById("name").value = "";
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