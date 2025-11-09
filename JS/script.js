//alert("WELCOME may the odd be ever in your favor");

//Global Variables
let PLAYER_WIN_COUNT = 0;
let PLAYER_LOSS_COUNT = 0;
let WIN_LOSE_RATIO = (PLAYER_WIN_COUNT/PLAYER_LOSS_COUNT);
let randomNumber;
let attempts = 0;
let maxAttempts = 7;    
initializeGame();


//hide win loss ratio at the start
document.querySelector("#win_lose").style.display = "none"; 

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
 
    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";
   
    //adding focus to textbox                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    document.querySelector("#playerGuess").focus();
    
 }

 //event listener for the Submit button
 document.querySelector("#submit_button").addEventListener("click", checkGuess);
 document.querySelector("#resetBtn").addEventListener("click", resetGame);

 function checkGuess(){
   
    let feedback = document.querySelector("#feedback");
    let triesleft = document.querySelector("#triesleft");
    feedback.textContent = "";
    triesleft.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player's Guess: " + guess);
    attempts++;


    if(guess == randomNumber){
        feedback.textContent = "YOU WON: Congratulations! You've guessed the correct number!";
        feedback.style.color = "green";
        PLAYER_WIN_COUNT++;
        gameOver();
    
    }   else{
           
            if(attempts == 7){
                feedback.textContent = `YOU LOST: Sorry, you've used all your attempts. CORRECT NUMBER WAS ${randomNumber}.`;
                PLAYER_LOSS_COUNT++;
                gameOver();
                return;
            } else if(guess < 1 || guess > 99){
                feedback.textContent = "Please enter a number between 1 and 99";
                feedback.style.color = "red";
                triesleft.textContent = `You have ${7 - attempts} attempt(s) left`;
                triesleft.style.color = "orange";
                document.querySelector("#guesses").innerHTML += " no answer (you wasted an attempt) <br>";
                return;

            } else if(guess < randomNumber){
                feedback.textContent = "Your guess is too low. Try again!";
                feedback.style.color = "blue";
                triesleft.textContent = `You have ${7 - attempts} attempt(s) left`;
                triesleft.style.color = "orange";
                document.querySelector("#guesses").innerHTML += guess+ " (too low)"+"<br>";
                return;

            } else if (guess > randomNumber){
                feedback.textContent = "Your guess is too high. Try again!";
                feedback.style.color = "blue";
                triesleft.textContent = `You have ${7 - attempts} attempt(s) left`;
                triesleft.style.color = "orange";
                document.querySelector("#guesses").innerHTML += guess+ " (too high)"+"<br>";
                return;

            }


        }
   
 }

 function gameOver(){
    let guessBtn = document.querySelector("#submit_button");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // hides guess button
    resetBtn.style.display = "inline"; // shows reset button
    //display win loss ratio
    document.querySelector("#win_lose").style.display = "inline";
    document.querySelector("#win_lose").innerHTML = "WINS: "+ PLAYER_WIN_COUNT + "<br>";
    document.querySelector("#win_lose").innerHTML += "LOSSES: "+ PLAYER_LOSS_COUNT + "<br>";
    document.querySelector("#win_lose").innerHTML += "WIN/LOSS RATIO: "+ ((PLAYER_WIN_COUNT/(PLAYER_LOSS_COUNT+PLAYER_WIN_COUNT) * 100).toFixed(2) + "% <br>");
 }

 function resetGame(){
    attempts = 0;
    document.querySelector("#guesses").innerHTML = "";
    document.querySelector("#feedback").textContent = "";
    document.querySelector("#triesleft").textContent = "";
    document.querySelector("#playerGuess").value = "";
    initializeGame();
    let guessBtn = document.querySelector("#submit_button");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "inline"; // shows guess button
    resetBtn.style.display = "none"; // hides reset button

    


 }