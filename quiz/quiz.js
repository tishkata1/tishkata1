

/** Quiz controller **/

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function(){
    return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function(){
    return this.questions.length === this.questionIndex;
};

//correct or not answer

Quiz.prototype.guess = function(answer){
    if(this.getQuestionIndex().correctAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
};



/** Question **/

function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}

Question.prototype.correctAnswer = function(choice){
    return choice === this.answer;
};


/**                 APP           **/

function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}

    function guess(id, guess){
        var button = document.getElementById(id);
        button.onclick = function(){
            quiz.guess(guess);
            populate();
        }
    }


// change the progress of questions
function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores(){
    var gameOver = "<h1>Result</h1>";
        gameOver += "<h2 id='score'> Your score: " + quiz.score + "</h2>" +
            "<br>" + "<button id='playAgain' onclick='location.href=\"index.html\"'>Play Again</button>" ;
        var element = document.getElementById("wrapper");
        element.innerHTML = gameOver;
}

var questions=[
    new Question("What is my name bro?", ["Tishkata", "Lebron", "Izdislav", "ivan"], "Tishkata"),
    new Question("What is my height?", ["1.90", "1.72", "1.80", "1.50"], "1.72"),
    new Question("Who is the best club in the world?", ["CSKA", "Litex", "leWCki", "Barcelona"], "CSKA"),
    new Question("My hometown?", ["Mezdra", "Sofia", "New York", "Vratsa"], "Vratsa")
];

var quiz = new Quiz(questions);

populate();
