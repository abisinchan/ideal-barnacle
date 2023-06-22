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


});

var questionIndex = 0

var questionElement = document.getElementById('question');
  var optionsElement = document.getElementById('options');
  
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




  });
  