export const hasWinner = (arr, name) => arr.some(item => item.name === name);

export const getWinner = (arr, name) => arr.find(item => item.name === name);

export const updateWinScore = winScore => {
    const value = document.querySelector("[name='final-score-value']").value;
    if (value) {
      winScore = value;
    } else {
      alert("Вы не ввели значение в поле ввода");
    }
    return winScore;
}

export const showWinners = winners => {
    if (winners.length) {
      const result = winners
        .sort((a, b) => (b.winRate - a.winRate))
        .reduce((acc, item) => {
          return acc + `${item.name}: ${item.winRate} wins\n`
        }, '');
      alert(result);
    } else {
      alert('Еще никто не выигрывал!');
    }
}