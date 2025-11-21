//globalvariables
lang = ""

//functions
function displayq4Choices(){
    let q4ChoicesArray = ["Esperanto", "English", "Spanish", "French"];
   // q4ChoicesArray.sort(() => Math.random() - 0.5); //shuffle the array
   q4ChoicesArray = _.shuffle(q4ChoicesArray); //shuffle using lodash library
    
    for (let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += 
        `<input type="radio" name="lang" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
         <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label><br>`;
    }
}

function displayFlag(){
    let currentflag = lang;

}