//Event listener for button click
document.querySelector("button").addEventListener("click", gradeQuiz);


//global variables
let score = 0;
var attempts = localStorage.getItem("total_attempts");
displayq4Choices();

//functions
function displayq4Choices(){
    let q4ChoicesArray = ["Maine", "Maryland", "Rhode Island", "Delaware"];
   // q4ChoicesArray.sort(() => Math.random() - 0.5); //shuffle the array
   q4ChoicesArray = _.shuffle(q4ChoicesArray); //shuffle using lodash library
    
    for (let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += 
        `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
         <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label><br>`;
    }
}



function isFormValid(){
    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    if(document.querySelector("#q6").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk6").innerHTML = "Question 6 was not answered";
    }
    if(document.querySelector("#q9").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk9").innerHTML = "Question 9 was not answered";
    }
    if(document.querySelector("#q10").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk10").innerHTML = "Question 10 was not answered";
    }
    return isValid;
} //isFormValid


function rightAnswer(index){
    document.querySelector( `#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector( `#q${index}Feedback`).className= "bg-success text-white";
    document.querySelector( `#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='checkmark icon'>";
}
function wrongAnswer(index){
    document.querySelector( `#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector( `#q${index}Feedback`).className= "bg-warning text-white";
    document.querySelector( `#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='X mark'>";
}


function gradeQuiz(){
    console.log("Grading Quiz...");
    document.querySelector("#validationFdbk").innerHTML = "";//resets validation feedback
    document.querySelector("#validationFdbk6").innerHTML = "";//resets validation feedback
    document.querySelector("#validationFdbk9").innerHTML = "";//resets validation feedback
    document.querySelector("#validationFdbk10").innerHTML = "";//resets validation feedback
    if(!isFormValid()){
        return; //stops grading if form is not valid
    }
    //variables
    score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    console.log(q1Response);
    let q2Response = document.querySelector("#q2").value;
    console.log(q2Response);
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value;
    let q8Response = document.querySelector("#q8").value;
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    console.log(q9Response);
    let q10Response = document.querySelector("#q10").value.toLowerCase();
    console.log(q10Response);

    //grading question 1
    if (q1Response == "sacramento"){
        rightAnswer(1);
        score+=10
    }else{
       wrongAnswer(1);
    }

    
    //grading question 2
    if (q2Response == "mo"){
        rightAnswer(2);
        score+=10
    }else{
        wrongAnswer(2);
    }

     //grading question 3
     if (document.querySelector("#Jefferson").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked && document.querySelector("#Roosevelt").checked){
        rightAnswer(3);
        score+=10
    }else{
        wrongAnswer(3);
    }

        //grading question 4
    if (q4Response == "Rhode Island"){
        rightAnswer(4);
        score+=10
    }
    else{
        wrongAnswer(4);
    }
        //grading question 5
   
    if (q5Response == "au"){
        rightAnswer(5);
        score+=10;
    }else{
        wrongAnswer(5);
    }

    //grading question 6
    if (q6Response == "50"){
        rightAnswer(6);
        score+=10;
    }else{
        wrongAnswer(6);
    }

    // Question 7: Great Lakes
if ( document.querySelector("#Ontario").checked &&
document.querySelector("#Superior").checked &&
document.querySelector("#Erie").checked &&
!document.querySelector("#Tahoe").checked ) {

rightAnswer(7);
score += 10;

} else {
wrongAnswer(7);
}
    // Question 8: florida image
if (q8Response == "fl"){
    rightAnswer(8);
    score+=10;
}else{
    wrongAnswer(8);
}

 //grading question 9
 if (q9Response == "golden gate bridge"){
    rightAnswer(9);
    score+=10
}else{
   wrongAnswer(9);
}

 //grading question 10
 if (q10Response == "oklahoma"){
    rightAnswer(10);
    score+=10
}else{
wrongAnswer(10);
}



    


    //score and attempts display
   
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;

    localStorage.setItem("total_attempts", attempts);

    if (score > 80) {
        document.querySelector("#winner").innerHTML =
          "Based on my requirements, this is a congratulatory message because you scored above 80!";
        
          document.querySelector("#winnerImg").innerHTML =
  "<img src='img/win.png' class='img-fluid mx-auto d-block rounded shadow' style='max-width: 40%;' alt='Trophy icon'>";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
    }
}