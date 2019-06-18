/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const RESET_VALUE = 2;

let activePlayer = 0;
let winScore = 100;
const diceElements = Array.from(document.querySelectorAll('.dice'));

const gamer = {
  getScore: function() {
    return this.score
  },
  setScore: function() {
    this.score += this.current;
  },
  resetScore: function() {
    this.current = 0;
  }
}

const player1 = Object.create(gamer);
const player2 = Object.create(gamer);
const playerN = Object.create(gamer);
const players = [player1, player2];
const currentPlayer = players[activePlayer];

const initGame = () => {
  player1.name = prompt('Введите имя первого игрока', 'Player 1');
  player1.resetScore();
  player1.score = 0;
  player2.name = prompt('Введите имя второго игрока', 'Player 2');
  player2.resetScore();
  player2.score = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElements.forEach(item => item.style.display = 'none');

  players.forEach((item, index) => {
    if (item.name === null) {
      item.name = `Player ${index + 1}`;
    }
  })
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
  diceElements.forEach(item => item.style.display = 'none');
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

const updateWinScore = () => {
  const value = document.querySelector("[name='final-score-value']").value;
  if (value) {
    winScore = value;
  } else {
    alert("Вы не ввели значение в поле ввода");
  }
}

document.querySelector('.form__button').addEventListener('click', function(e) {
  e.preventDefault();
  updateWinScore();
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  currentPlayer.setScore();
  document.querySelector(`#score-${activePlayer}`).textContent = currentPlayer.getScore();
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
