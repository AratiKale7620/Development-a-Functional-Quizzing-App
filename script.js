const questions =[
    {
        question: "which of the following is not a valid functional in java ?",
        answers:[
            { text:"Runnable", correct: false},
            { text:"Callable", correct: false},
            { text:"Serializable", correct: true},
            { text:"Comparator", correct: false}
            
            
        ]
    },
    {
        question: "Which of the folowing is not a java primitive data type ?",
        answers:[
            { text:"string", correct: true},
            { text:"int", correct: false},
            { text:"boolean", correct: false},
            { text:"char", correct: false}
            
            
        ]
    },
    {
        question: "which keyword is used to prevent method overriding in Java ?",
        answers:[
            { text:"static", correct: false},
            { text:"final", correct: true},
            { text:"abstract", correct: false},
            { text:"private", correct: false}
            
            
        ]
    },
    {
        question: " What is the default size of an ArrayList in Java?",
        answers:[
            { text:"5", correct: false},
            { text:"10", correct: true},
            { text:"15", correct: false},
            { text:"20", correct: false}
            
            
        ]
    },
    {
        question: "When is the object created with new keyword ?",
        answers:[
            { text:"At compile time", correct: false},
            { text:"Depends on the code", correct: false},
            { text:"At run time", correct: true},
            { text:"None"}
            
            
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    restState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function restState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    restState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz()