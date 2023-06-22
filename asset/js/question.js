document.addEventListener('DOMContentLoaded', function() {
    let quiz = [
        {
            question: "What is an example of a float?",
            option: [
                "1",
                "60",
                "300",
                ".9",
            ],
            answer: 4,
        },
        {
            question: "What is an example of a string?",
            option: [
                "3",
                "\"hello\"",
                "true",
                "false",
            ],
            answer: 2,
        },
        {
            question: "What does boolean stand for?",
            option: [
                "true and false",
                "7",
                "if statement",
                "\"hello\"",
            ],
            answer: 1,
        },
        {
            question: "What combines a string together?",
            option: [
                "variable",
                "function",
                "concatenation",
                "divide",
            ],
            answer: 3,
        },
        {
            question: "Which one does NOT create a variable?",
            option: [
                "let",
                "const",
                "var",
                "NaN",
            ],
            answer: 4,
        },
        {
            question: "What is a scope?",
            option: [
                "limits where a variable exist",
                "let us combine boolean values",
                "chooses number between 0 & 1",
                "behaves just like true",
            ],
            answer: 1,
        },
        {
            question: "What is a function?",
            option: [
                "selects random moves",
                "groups multiple values together",
                "JavaScript Object Notation",
                "lets us reuse a code",
            ],
            answer: 4,
        },
        {
            question: "What is an object for?",
            option: [
                "selects random moves",
                "groups multiple values together",
                "JavaScript Object Notation",
                "lets us reuse a code",
            ],
            answer: 2,
        },
        {
            question: "Which does the local storage only store?",
            option: [
                "object",
                "booleans",
                "strings",
                "numbers",
            ],
            answer: 3,
        },
        {
            question: "What models the webpage",
            option: [
                "JSON",
                "JQuery",
                "DOM",
                "API",
            ],
            answer: 3,
        },
    
    
    
    
    
    ]
    var score = 0;
  var questionIndex = 0;
  var time = 90;
  var interval;

  var questionElement = document.getElementById('question');
  var optionsElement = document.getElementById('options');
  var scoreElement = document.getElementById('score');
  var timerElement = document.getElementById('timer');
  var submitButton = document.getElementById('submit-btn');
  var playAgainButton = document.getElementById('play-again-btn');
  var viewScoresButton = document.getElementById('viewScoresBtn');
  var scoreDisplayElement= document.getElementById('scoreDisplay');

  function displayQuestion() {
    var currentQuestion = quiz[questionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = '';

    currentQuestion.option.forEach(function(option, index) {
      var button = document.createElement('button');
      button.classList.add('option');
      button.textContent = option;
      button.addEventListener('click', function() {
        checkAnswer(index + 1);
      });
      optionsElement.appendChild(button);
    });
  }

  function checkAnswer(selectedAnswer) {
    var currentQuestion = quiz[questionIndex];
    var selectedOption = optionsElement.children[selectedAnswer - 1];

    if (selectedAnswer === currentQuestion.answer) {
      score++;
      selectedOption.classList.add('correct');
    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      selectedOption.classList.add('incorrect');
    }

    Array.from(optionsElement.children).forEach(function(option) {
      option.disabled = true;
    });

    questionIndex++;

    if (questionIndex === quiz.length || time === 0) {
      clearInterval(interval);
      displayQuizOver();
      return;
    }

    setTimeout(function() {
      selectedOption.classList.remove('correct', 'incorrect');
      displayQuestion();
    }, 1000);

    scoreElement.textContent = score;
  }

  function updateTimer() {
    timerElement.textContent = time;
    if (time === 0) {
      clearInterval(interval);
      displayQuizOver();
      return;
    }

    time--;
  }

  function displayQuizOver() {
    questionElement.textContent = "Quiz Over!";
    optionsElement.innerHTML = "If you got a high score dont't forget to submit!";
    playAgainButton.style.visibility = 'visible'; 
    submitButton.style.visibility = 'visible'; 
    viewScoresButton.style.visibility ='visible';
    scoreDisplayElement.style.display ='block';
    submitButton.addEventListener('click', promptNScore);
    viewScoresButton.addEventListener('click', displayTopScores);
    
  }

  function resetQuiz() {
    score = 0;
    questionIndex = 0;
    time = 90;
    scoreElement.textContent = score;
    clearInterval(interval);
    playAgainButton.style.visibility = 'hidden'; 
    submitButton.style.visibility = 'hidden'; 
    viewScoresButton.style.visibility ='hidden';
    scoreDisplayElement.style.display ='none';
    displayQuestion();
    interval = setInterval(updateTimer, 1000);
  }



  playAgainButton.addEventListener('click', function() {
    resetQuiz();
  });

  displayQuestion();
  interval = setInterval(updateTimer, 1000);

  function promptNScore() {
    const modal = document.getElementById('scoreModal');
    const modalInput = document.getElementById('scoreInitials');
    const modalSubmit = document.getElementById('scoreSubmit');
  
    modal.style.display = 'block';
  
    modalSubmit.addEventListener('click', function() {
      const userInitial = modalInput.value.trim();
  
      if (userInitial) {
        // Save the data (userInitial and score) in local storage
        const userData = {
          initials: userInitial,
          score: score
        };
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(userData);
        highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
        highScores.splice(10); // Keep only the top 10 scores
        localStorage.setItem('highScores', JSON.stringify(highScores));
  
        // Hide the modal
        modal.style.display = 'none';
  
        // Display top 10 scores
        displayTopScores();
      }
    });
  }
  
  function displayTopScores() {
    const scoreDisplayElement = document.getElementById('scoreDisplay');
    const highScoresData = JSON.parse(localStorage.getItem('highScores'));
    scoreDisplayElement.innerHTML = '';
  
    if (highScoresData && highScoresData.length > 0) {
      const heading = document.createElement('h2');
      heading.textContent = 'Top 10 Scores';
      scoreDisplayElement.appendChild(heading);
  
      const list = document.createElement('ol');
      highScoresData.forEach(data => {
        const item = document.createElement('li');
        item.textContent = `${data.initials}: ${data.score}`;
        list.appendChild(item);
      });
  
      scoreDisplayElement.appendChild(list);
  
      // Add a button to clear the scores
      const clearButton = document.createElement('button');
      clearButton.textContent = 'Clear Scores';
      clearButton.addEventListener('click', function() {
        // Clear the scores from localStorage
        localStorage.removeItem('highScores');
        // Re-display the top scores (which will show the "No scores available" message)
        displayTopScores();
      });
      scoreDisplayElement.appendChild(clearButton);
    } else {
      const message = document.createElement('p');
      message.textContent = 'No scores available.';
      scoreDisplayElement.appendChild(message);
    }
  }
  

});
  
