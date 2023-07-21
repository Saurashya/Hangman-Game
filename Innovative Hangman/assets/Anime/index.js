var fruits = [
  "attack on titan", "my hero academia", "naruto", "one piece", "dragon ball z", "sword art online", "death note", "demon slayer", "fullmetal alchemist", "naruto shippuden", "hunter x hunter", "tokyo ghoul", "one punch man", "bleach", "fairy Tail", "steins gate","code geass", "dragon ball super", "black clover", "jojos bizarre adventure", "mob psycho", "fate", "attack on titan", "re zero ", "the promised neverland", "haikyuu"]
  
  let answer = '';
  let maxWrong = 6;
  let mistakes = 0;
  let guessed = [];
  let wordStatus = null;
  
  function randomWord() {
    answer = fruits[Math.floor(Math.random() * fruits.length)];
  }
  function getHint() {
    for (let i = 0; i < answer.length; i++) {
      const letter = answer[i].toLowerCase();
      if (guessed.indexOf(letter) === -1) {
        guessed.push(letter);
        guessedWord();
        document.getElementById(letter).setAttribute('disabled', true);
        return;
      }
    }
  }
  function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }
  
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }
  
  function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
  }
  
  function checkIfGameWon() {
    if (wordStatus === answer) {
      document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
  }
  
  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
      document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
  }
  
  function guessedWord() {
    wordStatus = answer
      .split('')
      .map((letter) => (guessed.indexOf(letter.toLowerCase()) >= 0 || letter === ' ' ? letter : " _ "))
      .join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
  }
  
  function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
  }
  
  function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
    getHint();
  }
  
  document.getElementById('maxWrong').innerHTML = maxWrong;
  
  randomWord();
  generateButtons();
  guessedWord();
  getHint();