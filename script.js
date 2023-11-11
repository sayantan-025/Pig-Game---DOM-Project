"use strict";

// selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const newGameEL = document.querySelector(".btn--new");
const rollDiceEL = document.querySelector(".btn--roll");
const holdEL = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// starting conditions

const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	diceEL.classList.add("hidden");

	player0EL.classList.remove("player--winner");
	player1EL.classList.remove("player--winner");
	player0EL.classList.add("player--active");
	player1EL.classList.remove("player--active");
};
init();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
	player0EL.classList.toggle("player--active");
	player1EL.classList.toggle("player--active");
};

rollDiceEL.addEventListener("click", function () {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;

		diceEL.classList.remove("hidden");
		diceEL.src = `./images/dice-${dice}.png`;

		if (dice != 1) {
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
});

holdEL.addEventListener("click", function () {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= 100) {
			playing = false;
			diceEL.classList.add("hidden");

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
		} else {
			switchPlayer();
		}
	}
});

newGameEL.addEventListener("click", init);
