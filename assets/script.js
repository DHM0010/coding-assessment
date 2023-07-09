

window.onload = function(){

  var quizEnd = document.getElementById("quiz-end")
quizEnd.style.display = 'none';
console.log("test")
var interval;
var quizQuestions = [
  {
    question: "1.) What does 'null' mean in JavaScript?",
    choices: ["positive value", "negative value", "zero value", "unknown value"],
    correctAnswer: 2
  },
  {
    question: "2.) What does the term 'Var' stand for in JavaScript?",
    choices: ["variable", "various", "variant", "variate"],
    correctAnswer: 0
  },
  {
    question: "3.) What does the NaN value represent in JavaScript?",
    choices: ["No Answer necessary", "Null and None", "Negative and Negative", "Not a Number"],
    correctAnswer: 3
  },
  {
    question: "4.) Which of the following is NOT a valid JavaScript data type?",
    choices: ["boolean", "string", "character", "number"],
    correctAnswer: 2
  },
  {
    question: "5.) Which operator is used to compare both value and type in JavaScript?",
    choices: ["!==", "===", "==", "="],
    correctAnswer: 1
  },
  {
    question: "6.) Which method is used to add an element at the end of an array in JavaScript?",
    choices: ["add()", "concat()", "append()", "push()"],
    correctAnswer: 3
  },
  {
    question: "7.) Which keyword is used to declare a constant variable in JavaScript?",
    choices: ["let", "var", "const", "final"],
    correctAnswer: 2
  },
  {
    question: "8.) Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<javascript>", "<js>", "<scripting>"],
    correctAnswer: 0
  },
  {
    question: "9.) How do you call a function named myFunction?",
    choices: ["call myFunction()", "myFunction()", "Call.myFunction()", "call function myFunction"],
    correctAnswer: 1
  },
  {
    question: "10.) How does a for loop start?",
    choices: ["for (i = 0; i <= 5)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i <= 5; i++)"],
    correctAnswer: 2
  }
];
console.log("test 2");

var questionContainer = document.getElementById("question-container");
var questionText = document.getElementById("question-text");
var choicesContainer = document.getElementById("choices-container");
var score = 0; 
var results = [];
var resultsFromStorage = localStorage.getItem('results'); 
if(resultsFromStorage){
  results = JSON.parse(resultsFromStorage);
  results.forEach(function(result) {
    var listItem = document.createElement("li");
    listItem.textContent = result.initials + ": " + result.score;
    var resultsList = document.getElementById("results");
    
    resultsList.appendChild(listItem);
  });
}





console.log(quizEnd)
function renderQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;


  currentQuestion.choices.forEach(function(choice, index) {
    var choiceButton = choiceButtons[index]
    choiceButton.textContent = choice;
  });
}

console.log("test 3");

var choiceButtons = document.querySelectorAll("#choices-container .option-button");

choiceButtons.forEach(function(choiceButton, index) {
  choiceButton.addEventListener("click", function(event) {
    console.log("Inside choice button click event listener");

    var selectedIndex = this.getAttribute('index')
    var currentQuestion = quizQuestions[currentQuestionIndex];
    console.log("test 5");

    if (selectedIndex == currentQuestion.correctAnswer) {
      score++;
      scoreElement.textContent = score;
    } else {
      alert("Incorrect!");
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      clearInterval(interval)
      displayEnd(true);
    }

  });
});

var currentQuestionIndex = 0;

var choicesContainer = document.getElementById("choices-container");
var scoreElement = document.getElementById("score");
console.log("test 4");

let start_button = document.querySelector('#start-button')
let quiz_screen = document.querySelector('#quiz-screen')
var timer = document.querySelector("#timer")
var time = 75

start_button.addEventListener('click', function() {
  quiz_screen.style.display = 'block'
  timer.innerHTML = time
  interval = setInterval(function() {
    time = time - 1
    timer.innerHTML = time
    if (time == 0) {
      //alert('fail')
      clearInterval(interval);
      
      displayEnd(true); 
    }
  }, 1000)
})

var questionText = document.querySelector('#question-text')
var question = quizQuestions[0]
questionText.innerHTML = question.question

var options = document.querySelectorAll('.option-button')
for (let i = 0; i < question.choices.length; i++) {
  var option = options[i]
  option.innerHTML = question.choices[i]
}



function displayEnd(status){
console.log("end");
quizEnd.style.display = 'block'
document.getElementById('timer-container').style.display = 'none'
  if(status){
    // const main = document.querySelector('main'); 
    

   
   
  

    var initials = prompt("Enter your initials:");
    var result = { initials: initials, score: score };

    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));

    var scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;

    var resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    results.forEach(function(result) {
      var listItem = document.createElement("li");
      listItem.textContent = result.initials + ": " + result.score;
      resultsList.appendChild(listItem);
    });
  }
}
}();