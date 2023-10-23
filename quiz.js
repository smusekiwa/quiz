// Selecting elements from the HTML document
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreText = document.querySelector ('#score');

// Initialize variables
let shuffledQuestions, currentQuestionIndex

// Event listeners for buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Initialize a time-related variable
let time = 2;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

// Select the element for countdown
let counting = document.getElementById("count-down");

// Function to start the countdown timer
function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScore();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000)
}

// Start the countdown timer
startCountdown();

// Define a class for the quiz
class Quiz {
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    get questionIndex(){
        return this.questions[this.questionIndex];
    }
    guess(answer){
        if (this.getQuestionIndex().isCorrectAnswer(answer)){
            this.score++;
        }
        this.questionIndex++; 
    }

    isEnded(){
        return this.questionIndex === this.questions.length;
    }
}

// Define a class for individual questions
class Question {
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice){
        return this.answer === choice;
    }
}

// Function to display a question
function displayQuestion(){
    if (quiz.isEnded()){
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;
    }

    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
        let choiceElement = document.getElementById("choice" + 1);
        choiceElement.innerHTML = choices[i];
        guess("btn" + i, choices[i]);
    }

    showProgress();
}

// Function to display the progress of the quiz
function showProgress(){
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

// Function to start the quiz game
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Function to set the next question
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Function to display a question and its answer choices
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// Function to reset the state after answering a question
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Function to handle the selection of an answer
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
      } else {
        startButton.innerText = 'RESTART'
        startButton.classList.remove('hide')
      }
  }

// Function to set the status class for a given element
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// Function to clear the status class of an element
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// Array of questions and their answer choices
const questions = [
    {question: 'What is the capital of New Zealand?',
       answers: [
         { text: 'Christchurch', correct: false },
         { text: 'Dunedin', correct: false },
         { text: 'Auckland', correct: false },
         { text: 'Wellington', correct: true }
       ]
     },
     {
       question: 'What is the largest planet in our solar system?',
       answers: [
         { text: 'Neptune', correct: false },
         { text: 'Jupiter', correct: true },
         { text: 'Saturn', correct: false },
         { text: 'Earth', correct: false }
       ]
     },
   { question: 'Who is the author of the play "Romeo and Juliet"?',
       answers: [
         { text: 'William Shakespeare', correct: true },
         { text: 'Leonardo da Vinci', correct: false },
         { text: 'Anne Hathaway', correct: false },
         { text: 'Charles Dickens', correct: false }
       ]
     },
   { question: 'What shape has nine sides',
     answers: [
       { text: 'Triangle', correct: false },
       { text: 'Nanogon', correct: true },
       { text: 'Hexagon', correct: false },
       { text: 'Decagon', correct: false }
     ]
   },
   { question: 'What is the largest mammal in the world?',
     answers: [
       { text: 'Polar bear', correct: false },
       { text: 'Mammoth', correct: false },
       { text: 'Blue whale ', correct: true },
       { text: 'Asian Elephant', correct: false }
     ]
   },
   { question: 'In which direction does the sun rise?',
     answers: [
       { text: 'North', correct: false },
       { text: 'West', correct: false },
       { text: 'South', correct: false },
       { text: 'East', correct: true }
     ]
   },
];
