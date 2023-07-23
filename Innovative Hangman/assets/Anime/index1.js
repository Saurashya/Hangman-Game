var fruits = [
    "attack on titan", "my hero academia", "naruto", "one piece", "dragon ball z", "sword art online", "death note", "demon slayer", "fullmetal alchemist", "naruto shippuden", "hunter x hunter", "tokyo ghoul", "one punch man", "bleach", "fairy tail", "steins gate","code geass", "dragon ball super", "black clover", "jojos bizarre adventure", "mob psycho", "fate", "re zero ", "the promised neverland", "haikyuu","masamune no revenge","fruits basket","hells paradise","hajime no ippo","baki","your name","your lie in april","vinland saga","belzeebub","tokyo revengers","dr stone","dororo","overlord","horimiya","chainsawman","jujutsu kaisen"]
    
    let answer = '';
    let maxWrong = 6;
    let mistakes = 0;
    let guessed = [];
    let wordStatus = null;
    let hintUses = 0;
    function updateTimerDisplay(seconds) {
      const timerDisplay = document.getElementById('timer');
      timerDisplay.textContent = `${seconds} seconds`;
    }
  
    // Function to start the timer
    function startTimer() {
      let seconds = 60;
      updateTimerDisplay(seconds);
  
      // Update the timer every second
      const interval = setInterval(() => {
        seconds--;
        updateTimerDisplay(seconds);
      }, 1000);
  
      // Function to stop the timer when needed
      function stopTimer() {
        clearInterval(interval);
        var winstatus=document.getElementById('keyboard').innerHTML;
        if(winstatus != 'You Won!!!'){
        document.getElementById('keyboard').innerHTML = 'You lost!!!';
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        }
      }
      return stopTimer;
    }
    const stopTimerFunction = startTimer();
    setTimeout(() => stopTimerFunction(), 60000);
  
  
  
    function randomWord() {
      answer = fruits[Math.floor(Math.random() * fruits.length)];
    }

    function getHint() {
        // Check if the hint button has been used twice already
        if (hintUses >= 2) {
          return; // If it has, do nothing and return from the function
        }
    
        // Loop through the answer and find the first letter that hasn't been guessed
        for (let i = 0; i < answer.length; i++) {
          const letter = answer[i].toLowerCase();
          if (guessed.indexOf(letter) === -1) {
            // Update the hint uses count and disable the hint button if used twice
            hintUses++;
            if (hintUses >= 2) {
              document.getElementById('hintButton').setAttribute('disabled', true);
            }
    
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
    document.addEventListener('keydown', (event) => {
        // Check if the key pressed is an alphabet character
        if (/^[a-zA-Z]$/.test(event.key)) {
          // Convert the key to lowercase and call the handleGuess function
          handleGuess(event.key.toLowerCase());
        }
      });
    
    function reset() {
        location.reload();
    }
    
    document.getElementById('maxWrong').innerHTML = maxWrong;
    
    randomWord();
    generateButtons();
    guessedWord();