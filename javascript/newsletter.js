async function newsletterPrompt() {
    var promptEmail = prompt("Skriv in din email:");
    var promptName = prompt("Skriv in ditt namn:");
    let isEmailTrue = checkIfValidEmail(promptEmail)
    if(!isEmailTrue){
        alert("Not a valid email!");
        return;
    }   
    if (promptName == null || promptName == "") {
        alert("Du måste fylla i både namn och email för att kunna få nyhetsbrev.")
    } else if (promptEmail == null || promptEmail == "") {
        alert("Du måste fylla i både namn och email för att kunna få nyhetsbrev.")
    } else {
        alert("Välkommen " + promptName + "! Ett brev skickas nu till din mail.")
        let body = new FormData() 
        body.append("promptEmail", JSON.stringify(promptEmail));
        body.append("promptName", JSON.stringify(promptName));
        body.append("endpoint", "newsletterEndpoint");
        let result = await makeRequest("./api/recievers/signupReciever.php", "POST", body); 
    }
  }
function checkIfValidEmail(promptEmail){
    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(promptEmail.match(format)){
        return true;
    }else{
        return false;
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