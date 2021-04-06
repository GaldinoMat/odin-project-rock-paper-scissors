const selectionButtons = document.querySelectorAll("[data-selection]");
const playerScore = document.querySelector("[data-player-score]");
const computerScore = document.querySelector("[data-computer-score]");

const pcChoices = document.querySelectorAll(".pc-choice");

const roundButtons = document.querySelectorAll("[data-rounds]");

const starterPage = document.getElementById("starter-page");
const gamePage = document.getElementById("game-page");
const winnerPage = document.getElementById("winner-page");

const winner = document.querySelector("[data-winner]");

const disclaimerSection = document.getElementById("disclaimer-section");
const playerDisclaimer = document.getElementById("player-disclaimer");
const computerDisclaimer = document.getElementById("computer-disclaimer");

let totalRounds = 0;
let gameRounds = 0;

let playerWins = false;
let pcWins = false;
let gameOver = true;

let pastComputerChoice = 0;

const possibleChoices = [
  {
    name: "rock",
    symbol: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    symbol: "🖐",
    beats: "rock",
  },
  {
    name: "scissors",
    symbol: "✌️",
    beats: "paper",
  },
];

// Event Listeners
roundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    totalRounds = button.dataset.rounds;
    gameRounds = totalRounds;

    handleGameState();
  });
});

selectionButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const name = button.dataset.selection;
    const selectedSymbol = possibleChoices.find(
      (selection) => selection.name === name
    );
    selectSymbol(selectedSymbol);
  })
);

// Handles starting page & game page visibility
function handleGameState() {
  if (gameRounds != 0) gameOver = !gameOver;

  if (!gameOver) {
    toggleVisibility(starterPage, gamePage);
  }

  if (gameOver) {
    toggleVisibility(gamePage, winnerPage);

    if (playerWins) winner.innerText = "PLAYER";
    if (pcWins) winner.innerText = "COMPUTER";

    setTimeout(() => {
      toggleVisibility(winnerPage, starterPage);

      playerScore.innerText = 0;
      computerScore.innerText = 0;
    }, 4000);
  }
}

function toggleVisibility(...divs) {
  divs.forEach((div) => {
    div.classList.toggle("visible");
  });
}

// Handles player and PC symbol selection
function selectSymbol(selection) {
  const computerSelection = pcSelection();

  disclaimerSection.classList.add("disclaimer-visible");

  playerDisclaimer.innerText = selection.name;
  computerDisclaimer.innerText = computerSelection.name;

  determineWinner(selection, computerSelection)
    ? addScore(playerScore)
    : addScore(computerScore);
}

function pcSelection() {
  if (pastComputerChoice !== 0) pastComputerChoice.classList.toggle("selected");

  const index = Math.floor(Math.random() * possibleChoices.length);
  pastComputerChoice = pcChoices[index];

  pcChoices[index].classList.toggle("selected");

  return possibleChoices[index];
}

// Winner selection
function determineWinner(playerInput, pcInput) {
  return playerInput.beats === pcInput.name;
}

// Handles and check score, as well as game end state
function addScore(score) {
  score.innerText = parseInt(score.innerText) + 1;
  handleGameOver();
}

function handleGameOver() {
  if (
    (totalRounds == 3 && gameRounds <= 1) ||
    (totalRounds == 5 && gameRounds < 3)
  ) {
    checkScore();

    if (playerWins || pcWins) handleGameState();
  }
  gameRounds--;
}

function checkScore() {
  return playerScore.innerText > computerScore.innerText
    ? (playerWins = true)
    : (pcWins = true);
}
