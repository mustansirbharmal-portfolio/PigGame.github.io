'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');   
const score1El = document.getElementById('score--1');     
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/* This both methods have function that it is selecting and ID but I will more prefer getElementById  method */
/* Here, we select the elements which will repeat again and again in this project and that's why we store it in separate variables */
/* getElementById  method we don't write # for selecting ID */


let scores, currentScore, activePlayer, playing;


                                           /*      **** DECLARING VALUES in init() ****   */

                                           //     **** NEW GAME BUTTON FUNCTIONING in init()  ****  

                                        /*                ***  IMP  BELOW ***         */

/* The variables which are initailised inside the function are only accessible to init() function only and that means they cannot be use 
   outside the init function  */

/* SOLUTION :- We need to declare these variables outside the function but without any value and in init() function it will be declare */

const init = function(){

   // Starting Conditions:-

   scores = [0,0];  // Stores the scores of Player 1 and 2
   currentScore = 0; 
   activePlayer = 0;
   playing = true;
   
   diceEl.classList.add('hidden');
   score0El.textContent = 0;         // Here, JS will automatically convert this string into number 
   score1El.textContent = 0;
   current0El.textContent = 0;
   current1El.textContent = 0;
 
   // Background Color Removal from Winning Player
 
   /* We remove player--winner from both the player because we don't know that which player is active */
   player0El.classList.remove('player--winner');    /* We know that only one of the element which is the winner will remove this class but 
                                                        JS will remove this class from 1 elemetn even if it's not present           */
   player1El.classList.remove('player--winner');  
   
   // In the begining, Player 0 or 1 is the active player and when we click on NEW GAME then also our active player will Player 1 or 0.
   // Now, we need to remove active class from 2nd and add active class to Player 1 because initially active one is Player 1
 
   player0El.classList.add('player--active');     
   player1El.classList.remove('player--active');
 
   /* If it's Player 1 turn and he/she press the reload button then player--active is already there and JS will not add again 
       and same for Player 2 but if it's Player 2 turn and he/she press the reload button then player--active class will be removed
        from player 1 or 2 section because we need to set initial conditions and player--active will be added to 1 Player or 0 Player. */ 
 
    /* Now, we also need to set internal state variables back to it's Initial State */
 

};

   init();   // JS first come to Function Definition and then it will call the Function and also our INITIAL VALUES 

   // By CALLING this ^ function here now we are able to use it's variables and it's value anywhere in the PROGRAM */


/* Here our current score variable cannot be in Handler Function because when we click roll dice button then each time our CURRENT SCORE
   will reset to 0 so that's why it should be outside the Hnadler Function */

/* Here, we make this variable to store our Current score of the current round */

/* Here, we set activePlayer to know which player is right now playing when the dice is roll. Also we need to track both th players 
   current Scores */

/* Here, activePlayer=0 because 0 is for Player No.1 and 1 for player no.2. WHY 0 for player 1 and 1 for player 2?
  Because we will store total scores of both players in an ARRAY and as we know Array has 0 based indexing that's why 0 = Player 1 
  and 1 = Player 2   */


const switchPlayer = function(){

    // Switch to Next Player and only CURRENT SCORE VALUES:
   
    document.getElementById(`current--${activePlayer}`).textcontent = 0;   /*This will change the current score value back to 0
                                                                              of Player 1 when it's switch to Player 2   */

    activePlayer = activePlayer === 0 ? 1 : 0;    /* This means that if activePlayer is equal to 0 then activePlayer value will change to 1 if it is 1 then activePlayer value change
                                                      to 0 but basically it will change from 0 to 1 only  */

    currentScore = 0;  /* We need to reset currentScore value back to 0 because when turn switch to player 2 or player 1 current score 
                           will calculate again */

   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');

   /* .classList.toggle('className'), we see all the methods of classList but now one method is remaining which is toggle method
      By using toggle, if an element does not have the class which is inside toggle('classname') then it will add that class to that 
      selected element but if it have that class then toggle will remove that class */

};

   

// Rolling Dice Functionality:-

btnRoll.addEventListener('click', function(){
if(playing){
   // 1. Generating random dice roll:-

const dice = Math.trunc(Math.random() * 6) + 1;  // Suppose, here Number Generated is 5
console.log(dice);


   // 2. Display Dice:-

diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;   //By this way we learn that how to display Images in JS

/* After '=' we can't even put extra space inside template literal for this case only, if we put extra space then there will be error */

   // 3. Check for rolled 1: 

   if(dice !== 1){

// Add dice to current score:

     currentScore += dice; // currentSocre = currentScore + dice;
     document.getElementById(`current--${activePlayer}`).textContent = currentScore; // This will change the current score of Active Player

   }

  else{

 // Switch to Next Player and only CURRENT SCORE VALUES:
 switchPlayer();
  
}
              }
});

  
    btnHold.addEventListener('click', function(){
    if(playing){

   // 1. Add Current Score to Active Player Score:

  scores[activePlayer] += currentScore;  // scores[activePlayer] = score[activePlayer] + currentScore
  // e.g:- scores[0] = scores[0] + currentScore   --> activePlayer = 0

  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


   // 2. Check if player's score is >= 100

if(scores[activePlayer] >= 20){
    
   playing = false;
    // If TRUE, FINISH THE GAME
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

    // Now, I need to remove the player--active class from the Player 1 because when I switch from Player 1 to palyer 2 then this both class get mixed
   document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

   /* REMEMBER, when we select element By ID then we don't need to put '#' but if we select element by class with th help of querySelector
      then we need to put '.' in the starting of class name to select it like in above */

   // Hidding the Dice when Player Wins:
      diceEl.classList.add('hidden');

   }
else{

   // If FALSE, Switch to Next Player
   switchPlayer();

}

        }

    });

//     **** NEW GAME BUTTON FUNCTIONING  ****    

    btnNew.addEventListener('click', init);  /* Here, init is an value which we pass in other function. KEEP IN MIND THAT HERE WE DO NOT 
                                                CALL THE FUNCTION, IT IS JS WHO CALL THE init() FUNCTION WHEN NEW GAME BUTTON IS CLICK */   







