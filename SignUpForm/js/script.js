//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.addEventListener("DOMContentLoaded", loadStates);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#retypePass").addEventListener("change", checkRetypePassword);
document.querySelector("#signupForm").addEventListener("submit",function(event){
    validateForm(event);
});
//document.querySelector("#suggestedPassword").addEventListener("click", checkPassword);
//functions


function validateForm(e) {
    let isValid = true;

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const retypePass = document.querySelector("#retypePass").value;

    const usernameError = document.querySelector("#usernameError");
    const retypeError = document.querySelector("#retypeError");
    const wrapper = document.querySelector(".form-wrapper");

    // reset error messages
    // (so old errors don't hang around)
    // optional but nice
    // usernameError.innerHTML = "";
    // retypeError.innerHTML = "";

    // ✅ Username required
    if (username.length === 0) {
        usernameError.innerHTML = "Username is required";
        usernameError.style.color = "red";
        isValid = false;
    }

    // ✅ Passwords must match
    if (password !== retypePass) {
        retypeError.innerHTML = "Passwords do not match!";
        retypeError.style.color = "red";
        isValid = false;
    }

    // If anything failed, block submit + shake
    if (!isValid) {
        e.preventDefault();

        // SHAKE THE WHOLE FORM
        wrapper.classList.add("shake");
        setTimeout(() => {
            wrapper.classList.remove("shake");
        }, 450);
    }
}


//Displaying city USING WEB API 
async function displayCity(){
    // alert(document.querySelector("#zip").value);
    let zipError = document.querySelector("#zipError");
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#lat").innerHTML = data.latitude;
    document.querySelector("#long").innerHTML = data.longitude;


    if (data ==  false){
        zipError.innerHTML = "  Invalid Zip Code: please enter zipcode a real place <br>";
        zipError.style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#lat").innerHTML = "";
        document.querySelector("#long").innerHTML ="";
       
    }else{
        zipError.innerHTML = "";

    }
}

async function loadStates(){
    let stateList = document.querySelector("#state")                                                ;
    let url = `https://csumb.space/api/allStatesAPI.php`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    
    
     stateList.innerHTML =`<option value="">Select State</option>`;//reset the options before loading more
    for (let i = 0; i <data.length; i++){
        stateList.innerHTML += `<option value="${data[i].usps}">"${data[i].state}</option>`;
    }
}





async function displayCounties(){
    let stateCode = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${stateCode}`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    
    
    let countryList = document.querySelector("#county");
    countryList.innerHTML = `<option value="">Select County</option>`;//reset the options before loading more
    for (let i = 0; i <data.length; i++){
        countryList.innerHTML += `<option>"${data[i].county}</option>`;
    }
}

async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let usernameError = document.querySelector("#usernameError");
    if (data.available == true){
        usernameError.innerHTML = "Username is available";
        usernameError.style.color = "green";
    }else{
        usernameError.innerHTML = "Username is NOT available";
        usernameError.style.color = "red";
    }
}
async function checkPassword(){
    let password = document.querySelector("#password").value;
    let suggest = document.querySelector("#”suggestedPwd”");

    suggest.innerHTML = "";
    let url = `https://csumb.space/api/suggestedPassword.php?length=${8}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)

    if (password.length < 6) {
       
    suggest.innerHTML = `Your password game is kind of weak 😅
    <div>
    <img src="img/laugh.gif" alt="minion laugh" style="width:15%; height:auto; margin-left:6px;">
    </div>

    try this one instead: <strong>${data.password}</strong>
  `;
    }else
   
    suggest.innerHTML = `
    Your password could be stronger! 💪
    <div>
    <img src="img/yay.gif" alt="yay minion" style="width:15%; height:auto; margin-left:6px;">
    </div>
    try this one instead: <strong>${data.password}</strong>
  ` ;
   
   
    
}

async function checkRetypePassword(){
    let password = document.querySelector("#password").value;
    let retypePass = document.querySelector("#retypePass").value;
    let retypeError = document.querySelector("#retypeError");


    let suggest = document.querySelector("#”suggestedPwd”");
    suggest.innerHTML = "";

    retypeError.innerHTML = "";

    if (password !== retypePass){
        retypeError.innerHTML = "Passwords do not match! ";
        retypeError.style.color = "red";
    }else{
        retypeError.innerHTML = "Passwords match! 😊";
        retypeError.style.color = "green";
    }
}

