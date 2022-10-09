
/* BTN */
const btnStart = document.querySelector('.start');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');

/* SELECTOR*/
const player1Score = document.querySelector('.p1__score')
const player1Current = document.querySelector('.p1__current');
const player2Score = document.querySelector('.p2__score')
const player2Current = document.querySelector('.p2__current');
const player1 = document.querySelector('.p1');
const player2 = document.querySelector('.p2');
const dice = document.querySelector('.dice img')
const winningModal = document.querySelector('.modal');
/* VAR */
let current_score = 0;
let isGame = false;
let isHold = false;
let activePlayer;
let current_player;
/**
 * Function reset all score of the party
 */
function resetScore() {
    current_score = 0;
    player1Score.innerText = 0;
    player1Current.innerText = 0;
    player2Score.innerText = 0;
    player2Current.innerText = 0;
}

/**
 * Determine who is playing
 */
 function currentPlayer() {
    if(player1.classList.contains('active')) {
        current_player = 1;
       return current_player; 
    } else if(player2.classList.contains('active')) {
        current_player = 2;
       return current_player;
    }
}

/**
 * Change player after hold function or after getting 1
 */
function NextPlayer(){
  
    if(current_player === 1) {
        player1.classList.remove('active')
        player2.classList.add('active');
    } else {
        player2.classList.remove('active');
        player1.classList.add('active');
    }
    currentPlayer();
}

/**
 * change image of dice and calcul points
 */
function rollDice() {
  
    playerActive = currentPlayer();

    if(isGame) {
        let diceNumber = Math.floor(Math.random() * 6) + 1;
        dice.src = "../assets/img/face"+diceNumber+".svg";
        console.log(diceNumber)
        if(diceNumber != 1) {
            current_score += diceNumber;
            document.querySelector(`.p${playerActive}__current`).innerText = current_score;
         
        } else {
            current_score = 0;
            document.querySelector(`.p${playerActive}__current`).innerText = current_score;
            NextPlayer()
        }
    }
}


/**
 * pick up gain and finish turn
 */
function hold(){
  
    playerActive = currentPlayer();
    if(isGame) {
        document.querySelector(`.p${playerActive}__score`).innerText = parseInt( document.querySelector(`.p${playerActive}__score`).innerText)+ current_score;
        current_score = 0;
        document.querySelector(`.p${playerActive}__current`).innerText = current_score;
        winner(playerActive);
        NextPlayer();

    }
}

/**
 *  Check end of party
 */
function winner(playerActive) {
   
    if ( parseInt( document.querySelector(`.p${playerActive}__score`).innerText) >= 100) {
        winningModal.classList.add('active');
        document.querySelector('.winner').innerText = ` Joueur ${playerActive} a gagné `;
        isGame = false;
    }
}

/**
 * function for starting a party
 */
function gameStart() {
   
    resetScore();
    winningModal.classList.remove('active');
    isGame = true;

    player1.classList.add('active');
    
}



btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', hold);

btnStart.addEventListener('click', gameStart);

