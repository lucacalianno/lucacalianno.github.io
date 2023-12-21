const quizData = [
 // Economics
  {
    question: 'Economics is the study of?',
    options: ['Scarce resources', 'How to make money', 'Bonds', 'James Bond'],
    answer: 'Scarce resources',
  },
  // Microeconomics
  {
    "question": "What is a monopoly in microeconomics?",
    "options": [
      "A market with many buyers and many sellers.",
      "A market with only one seller.",
      "A market with differentiated products.",
      "A market where the government sets the prices."
    ],
    "answer": "A market with only one seller."
  },
  {
    "question": "Monopoly prices are higher than competitive prices",
    "options": [
      "TRUE",
      "FALSE"
    ],
    "answer": "TRUE"
  },
  {
    "question": "What is elasticity of demand?",
    "options": [
      "The % change in quantity demanded divided by the % change in price.",
      "The % change in quantity demanded multiplied by the % change in price.",
      "A measure of how much the quantity demanded of a good responds to changes in consumer income.",
      "The total revenue earned by producers from selling a good"
    ],
    "answer": "The % change in quantity demanded divided by the % change in price."
  },
  {
    "question": "Diminishing marginal returns:",
    "options": [
      "As production increases, each additional unit of input adds more to total output.",
      "As production increases, each additional unit of input adds less to total output.",
      "The total output remains constant as additional units of input are added.",
      "The cost of production decreases with each additional unit of input."
    ],
    "answer": "As production increases, each additional unit of input adds less to total output."
  },
  // Macroeconomics
// GDP
  // Econometrics
  {
    question: 'Under Gauss-Markov assumptions, The OLS Estimator is:',
    options: ['BLUE', 'RED', 'GREEN', 'PURPLE'],
    answer: 'BLUE',
  },
  {
    question: 'I am estimating: log(Y)= b0 + b1*X + u; how should I interpret b1?',
    options: [
      'The change in Y if X increases by 1 unit', 
      'The change in Y if X increases by 1 percentage point', 
      'The percentage point change in Y if X increases by 1 unit', 
      'The percentage point change in Y if X increases by 1 percentage point', 
    ],
    answer: 'The percent change in Y if X increases by 1 unit',
  },
  {
    question: 'I am estimating: log(Y)= b0 + b1*log(X) + u; how should I interpret b1?',
    options: [
      'The change in Y if X increases by 1 unit', 
      'The change in Y if X increases by 1 percentage point', 
      'The percentage point change in Y if X increases by 1 unit', 
      'The percentage point change in Y if X increases by 1 percentage point', 
    ],
    answer: 'The percent change in Y if X increases by 1 percent',
  },
  {
    "question": "What is heteroscedasticity.",
    "options": [
      "The error term has constant variance",
      "The error terms have non-constant variance.",
      "A statistical technique to handle multicollinearity.",
      "A measure of the strength of the relationship between two variables.",
    ],
    "answer": "The error terms have non-constant variance.",
  },
  {
    question: 'Consider the following models: \
    (1) y = a0 + a1*w + x*a2 + u \
    (2) y = b0 + b1*w + x*b2 + w*(x - xbar)*b3 + v \
    If b3 != 0 and E(v|w,x) = 0, the OLS estimates the:',
    options: [
      'ATE', 
      'ATT', 
      'ATU', 
      'LATE', 
    ],
    answer: 'ATE',
  },
  {
    question: 'In an RCT, then ATE = ATT= ATU',
    options: [
      'TRUE', 
      'FALSE', 
    ],
    answer: 'TRUE',
  },
];
  
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');

let score = 0;
let first_attempt = 1;
let incorrectAnswers = [];
let showErrorMessage = false; 

  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const randomIndex = Math.floor(Math.random() * quizData.length);
    const questionData = quizData[randomIndex];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = showErrorMessage
        ? '<p style="color: red;"> Your answer was not correct! Retry</p>' + questionData.question
        : questionData.question;

    // Set the data attribute for the question index
    quizContainer.setAttribute('data-question-index', randomIndex);

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';
  
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];
  
        const optionText = document.createTextNode(shuffledOptions[i]);
  
        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

    showErrorMessage = false; // Reset showErrorMessage for the next question
}



  
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
      const answer = selectedOption.value;
      const currentQuestionIndex = parseInt(quizContainer.getAttribute('data-question-index'));
      const currentQuestionData = quizData[currentQuestionIndex];

      if (answer === currentQuestionData.answer) {
          score++;
      } else {
          incorrectAnswers.push({
              question: currentQuestionData.question,
              incorrectAnswer: answer,
              correctAnswer: currentQuestionData.answer,
          });
          showErrorMessage = true; // Set showErrorMessage to true for displaying error on the next question
      }

      displayResult();
  }
}


function getAnswerForQuestion(question) {
  for (const q of quizData) {
    if (q.question === question) {
      return q.answer;
    }
  }
  return null;
}

function displayResult() {
  if (score === 1) {
    window.location.href = 'snake_game.html'; // Redirect to a new page for correct answers
  } else {
    retryQuiz();
  }
}

  
function retryQuiz() {
  score = 0;
  first_attempt = 0;
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

  
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);

displayQuestion();