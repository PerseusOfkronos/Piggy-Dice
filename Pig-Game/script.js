'use strict';


//selecting elements
const player_0_element = document.querySelector('.player--0');
const player_1_element = document.querySelector('.player--1');
const score_1_element = document.querySelector('#score--0');
const score_2_element = document.getElementById('score--1');
const current_0_element = document.getElementById('current--0');
const current_1_element = document.getElementById('current--1');
const dice_element = document.querySelector('.dice');
const button_new = document.querySelector('.btn--new');
const button_roll = document.querySelector('.btn--roll');
const button_hold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;


//starting conditions

const init = function() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score_1_element.textContent = 0;
    score_2_element.textContent = 0;
    current_0_element.textContent = 0;
    current_1_element.textContent = 0;

    dice_element.classList.add('hidden');
    player_0_element.classList.remove('player--winner');
    player_1_element.classList.remove('player--winner');
    player_0_element.classList.add('player--active');
    player_1_element.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player_0_element.classList.toggle('player--active');
    player_1_element.classList.toggle('player--active');
}


//Rolling dice functionality
button_roll.addEventListener('click', function() {

    if (playing) {

        //1. generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. display dice
        dice_element.classList.remove('hidden');
        dice_element.src = `dice-${dice}.png`;

        //3.check for rolled 1: if true then switch to next player
        if (dice !== 1) {
            //add dice value to current score 
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});

button_hold.addEventListener('click', function() {

    if (playing) {

        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if player's score is >=100 - finished game
        if (scores[activePlayer] >= 100) {
            //player has finished game
            playing = false;
            dice_element.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // 3. switch to next player
            switchPlayer();
        }
    }
});

button_new.addEventListener('click', init);