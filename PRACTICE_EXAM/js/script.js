//globalvariables
lang = ""
displayq4Choices();
displayQuote();

//hide author bio intially
document.getElementById("hideMe").style.display = "none";


//event listenter
document.querySelector("#translate").addEventListener("click", translateQuote)
document.querySelector("#moreAuthor").addEventListener("click", unhideMe)

//functions
function displayq4Choices(){
    let q4ChoicesArray = ["Esperanto", "English", "Spanish", "French"];
   // q4ChoicesArray.sort(() => Math.random() - 0.5); //shuffle the array
   q4ChoicesArray = _.shuffle(q4ChoicesArray); //shuffle using lodash library
    
    for (let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#langChoices").innerHTML += 
        `<input type="radio" name="lang" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
         <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label><br>`;
    }
}

async function displayQuote(){
    const url = "https://csumb.space/api/famousQuotes/getRandomQuote.php"
   
    let authorPic = ""

    
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Resonse status: ${response.status');
        }
        const result = await response.json();
        console.log (result.quoteText);
        document.querySelector("#commenter1").innerHTML = `${result[1].author}`
        document.querySelector("#commenter2").innerHTML = `${result[2].author}`
        document.querySelector("#commenter2").innerHTML = `${result[3].author}`
        authorPic = result.picture;
        
        
    }catch (error){
        console.error(error.message);
    }
    

}

function unhideMe() {
    const hiddenBox = document.querySelector("#hideMe");

    if (hiddenBox.style.display === "none" || hiddenBox.style.display === "") {
        hiddenBox.style.display = "flex";   
    } else {
        hiddenBox.style.display = "none";  
    }
}




function translateQuote(){
    let q4Response = document.querySelector("input[name=lang]:checked").value;

    if (q4Response == "Esperanto"){
        lang = "Esperanto"
    }else if (q4Response == "English"){
        lang = "English"
    }else if (q4Response =="Spanish"){
        lang = "Spanish"
    }else if (q4Response == "French"){
        lang = "French"
    }

    displayQuote();
    displayFlag(lang);
    //call api
}

//response for language


function displayFlag(language){

    document.querySelector("#flag").innerHTML = "";
    if (language == "Esperanto"){
        document.querySelector("#flag").innerHTML = '<img src="img/esparanto_flag.png" alt="FLAGx">'
    }
    else  if (language == "English"){
        document.querySelector("#flag").innerHTML = '<img src="img/englishflag.png" alt="FLAGx">'
    }
    else if (language == "Spanish"){
        document.querySelector("#flag").innerHTML = '<img src="img/spanish_flag.png" alt="FLAGx">'
    }
    else if (language == "French"){
        document.querySelector("#flag").innerHTML = '<img src="img/french_flag.png" alt="FLAGx">'
    }
    console.log("CURRENT LANGUAGE IS" + language);
    
}