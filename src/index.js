import gamer from './constructor';
import { hasWinner, getWinner, updateWinScore, showWinners } from './helpers';
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const RESET_VALUE = 2;
const storageValue = localStorage.getItem('winners');

let activePlayer = 0;
let winScore = 100; 
let winners = storageValue !== null ? JSON.parse(storageValue) : [];
const diceElements = Array.from(document.querySelectorAll('.dice'));

const createPlayer = (name) => {
  if (hasWinner(winners, name)) {
    const player = getWinner(winners, name);
    Object.setPrototypeOf(player, gamer);
    return player;
  } else {
    const player = Object.create(gamer);
    player.name = name;
    return player;
  }
}

let name1 = prompt('Введите имя первого игрока', 'Player 1');
let name2 = prompt('Введите имя второго игрока', 'Player 2');

const player1 = createPlayer(name1);
const player2 = createPlayer(name2);
const players = [player1, player2];
let currentPlayer = players[activePlayer];

players.forEach((item, index) => {
  if (item.name === null || item.name === "") {
    item.name = `Player ${index + 1}`;
  }
})

player1.winRate = player1.winRate || 0;
player2.winRate = player2.winRate || 0;

const initGame = () => {
  player1.resetScore();
  player1.score = 0;
  player2.resetScore();
  player2.score = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElements.forEach(item => item.style.display = 'none');
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  let values = [];

  diceElements.forEach((item, index) => {
    let dice = Math.floor(Math.random() * 6) + 1;

    item.src = `img/dice-${dice}.png`;
    item.style.display = 'block';
    values[index] = dice;
  })

  if (!values.includes(RESET_VALUE) && values[0] !== values[1]) {
    currentPlayer.current += values[0] + values[1];
    document.getElementById('current-'+activePlayer).textContent = currentPlayer.current;

    if (currentPlayer.getScore() + currentPlayer.current >= winScore) {
      currentPlayer.winRate++;
      if (!hasWinner(winners, currentPlayer.name)) {
        winners.push(currentPlayer);
      }
      localStorage.setItem('winners', JSON.stringify(winners));
      alert(`${currentPlayer.name} won!!!`);
    }

  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  currentPlayer.resetScore();
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  currentPlayer = players[activePlayer];
  currentPlayer.resetScore();
  diceElements.forEach(item => item.style.display = 'none');
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.form__button').addEventListener('click', function(e) {
  e.preventDefault();
  winScore = updateWinScore(winScore);
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  let currentScore = currentPlayer.getScore();
  currentScore += currentPlayer.current;
  currentPlayer.setScore(currentScore);
  document.querySelector(`#score-${activePlayer}`).textContent = currentScore;
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

document.querySelector('.btn-show').addEventListener('click', function() {
  showWinners(winners);
});
