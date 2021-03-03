window.addEventListener("load", initiate)
function initiate(){
    checkIfAdmin()
    getCustomersForNewsletter()
    getAllUsers()
}
async function checkIfAdmin(){
    //Här vill vi kolla så att det är en admin annars kasta tillbaka till index.html, skapa header i php??
    let body = new FormData()
    body.append("endpoint", "checkIfAdmin")
    let response = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
    console.log(response)
    if(response == false){
        location.replace("http://localhost/Projektarbete-Webshop/index.html");
    }
}
async function getAllUsers(){
    let body = new FormData()
    body.append("endpoint", "getAllUsers")
    let response = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
    let userHolder = document.getElementById("users")
    userHolder.style.display = "flex"
    userHolder.style.flexDirection = "row"
    userHolder.style.flexWrap = "wrap"
    userHolder.style.justifyContent = "center"
    for (let i = 0; i < response.length; i++) {
        const user = response[i];
        let innerDiv = document.createElement("div")
        innerDiv.style.display = "flex"
        innerDiv.style.flexDirection = "column"
        innerDiv.style.justifyContent = "space-evenly"
        innerDiv.style.margin = "10px"
        /* innerDiv.style.alignItems = "center" */
        innerDiv.style.border = "1px solid black"
        innerDiv.style.padding = "10px"
        let email = document.createElement("h3")
        email.innerText = user.email
        let userID = document.createElement("h3")
        userID.innerText = "Användar-ID: " + user.userID + " "
        let isAdmin = document.createElement("h3")
        isAdmin.innerText = "Status: " + user.isAdmin
        if(user.isAdmin == "user"){
            let changeButton = document.createElement("button")
            changeButton.innerText = "Change to admin"
            changeButton.addEventListener("click", async ()=>{
                body.append("endpoint", "changeToAdmin")
                body.append("userID", JSON.stringify(user.userID))
                let response = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
                console.log(response)
                userHolder.innerHTML = " "
                getAllUsers()
            })
            innerDiv.append(userID, email, isAdmin, changeButton)
            userHolder.append(innerDiv)
        }else{
            innerDiv.append(userID, email, isAdmin)
            userHolder.append(innerDiv)

        }
        
    }
}
async function addAdmin(userID){
    console.log("Gör om till admin" + userID)
}
async function getCustomersForNewsletter(){
    let divHolder = document.getElementById("listNewsletter")
    let body = new FormData()
    body.append("endpoint", "getNewsletterCustomers")
    let response = await makeRequest("./api/recievers/signupReciever.php", "POST", body)
    if(response.length == 0){
        divHolder.innerText = "Ingen har skrivit upp sig.."
        return
    }
    let table = document.createElement("table")
    let rubrikerna = document.createElement("tr")
    let headers = Object.keys(response[0])
    headers = headers.slice(1, 3)
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
    divHolder.appendChild(table)
}
async function makeRequest(url, inputMethod, body){
    try{
        let response = await fetch(url, {method: inputMethod, body})
        return response.json()
    }catch(error){
        console.log(error)
    }
}