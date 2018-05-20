

var triviaQuestions = [
    {
        question: "When your buddy walks up to you and says 'Dude, look at this flapper!' what is he referring to?",
        answers: ["a hole in his pants", "a bird he found", "a tarp he brought with him", "a blister"],
        correctAnswer: 3
    },
    {
        question: "Your friend wants to show you his favorite crag. What is a crag?",
        answers: ["a camping spot", "drugs, definitely drugs", "a place to climb", "a river"],
        correctAnswer: 2
    },
    {
        question: "You're outside climbing and other people are offering you some beta. What is beta?",
        answers: ["some fish for lunch", "tips to help you", "drugs, tell them no thank you", "workout supplements for muscle growth"],
        correctAnswer: 1
    },
    {
        question: "Your buddy introduces you to his friends and says they're dirtbags. Why is he calling them that?",
        answers: ["They live out of their cars and don't make any money.", "Your buddy knows they are jerks and is warning you.", "They don't believe in showers", "They like gardening"],
        correctAnswer: 0
    },
    {
        question: "You are at the climbing gym and someone is screaming saying they are pumped, but why?",
        answers: ["They are announcing how excited they are.", "They are thirsy.", "Their arms are tired", "They have too much muscle to climb."],
        correctAnswer: 2
    },
    {
        question: "Is it acceptable to tell your girlfiend she has a nice rack while rock climbing outdoors together?",
        answers: ["Yes, because she has a lot of nice climbing gear", "No, it's rude to lie to someone about something like that."],
        correctAnswer: 0
    },
    {
        question: "You walk up to your friend who is climbing and ask him if he's been able to make it to the top of the route he's working on. He responds by saying 'Oh, it goes'. Huh?",
        answers: ["He's asking you if you'd like to leave.", "He's about to move onto an easier climbing problem because he can't do it", "They are taking the climbing holds down soon and he wants to  climb it before it's gone", "He's telling you that he thinks it can be done"],
        correctAnswer: 3
    }
]

//keeping score
var correctChoices = 0;
var wrongChoices = 0;
var userChoice;
//time allowed
var timeLeft = 16
timer = setInterval(timeLeft--, 1000);
//we will update currentQuestion upon submit or upon running out of time
var currentQuestion = 0

//loads the begin game screen when document is loaded
$(document).ready(function beginScreen() {
    var intro = $("<div>").addClass("intro-screen");
    var toBegin = $("<p>").text("If you want to be a climber you're going to have to know some of their lingo. Let's test your knowlege!");
    var beginButton = $("<button>").addClass("button start");
    beginButton.text("Start");
    $(intro).append(toBegin);
    $(intro).append(beginButton);
    $(".game").prepend(intro);
    //when you click start, the intro placeholder is emptied and the game begins
    $(".button").on("click", function () {
        $(intro).empty();
        beginGame();
    });
});

//this function will begin the game
function beginGame() {
    $(".timer").text(timeLeft + " seconds left!")
    displayQuestion();
    var SubmitButton = $("<button>").html("Submit");
    $(SubmitButton).addClass("button submit");
    $(".game").append(SubmitButton);
    countdown();
    //when submit is clicked
    $(".submit").on("click", function () {
        //store value of the checked radio button as userChoice
        userChoice = parseInt($('input[name=answer]:checked', '.answersGoHere').val());
        //if correct answer chosen, add 1 to correct answers and then move to next question
        transitionScreen()
    });
}
//this function will coundown and display updated time
function countdown() {
    if (currentQuestion < triviaQuestions.length) {
        timer = setInterval(function () {
            timeLeft--;
            checktimer();
            $(".timer").text(timeLeft + " seconds left!")
        }, 1000)
    }
}
//this function will check to see if you've run out of time on the current question. 
function checktimer(time) {
    //if you've run out of time, it will mark that you got it wrong and move to next question and restart timer
    if (timeLeft === 0) {
        timeLeft = 15;
        if (currentQuestion < triviaQuestions.length) {
            currentQuestion++;
            wrongChoices++;
            displayQuestion();
        }
    }
}
//displays the question to the html page
function displayQuestion() {
    if (currentQuestion < triviaQuestions.length) {
        //first we have to remove the previous stuff
        $(".questionsGoHere").empty();
        $(".answersGoHere").empty();
        $(".transition").empty();
        $(".submit").show();
        $(".timer").show();
        $(".transition").remove();
        //make the question div & put question inside
        var questionDiv = $("<div>")
        $(questionDiv).text(triviaQuestions[currentQuestion].question);
        $(".questionsGoHere").append(questionDiv);
        //displays the answer options to html page
        for (i = 0; i < triviaQuestions[currentQuestion].answers.length; i++) {
            //placeholder for all answer options to go into...
            //so that the button and the label show up next to each other
            var answerDiv = $("<div class='answerOption'>")

            //here's the radio buttons, with values and names
            var answerBubble = $("<input type='radio'>")
            $(answerBubble).val(i);
            $(answerBubble).attr("name", "answer");

            //append the radio buttons to the placeholder AnswerDiv
            $(answerDiv).append(answerBubble);
            //here's the labels for the radio buttons
            var answerBubbleLabel = $("<label>")
            $(answerBubbleLabel).text(triviaQuestions[currentQuestion].answers[i])
            //append the label to the answerDiv placeholder so it shows up next to the radio button
            $(answerDiv).append(answerBubbleLabel);

            //append the placeholder with radio buttons and labels to html page
            $(".answersGoHere").append(answerDiv);
        }

    } else {
        $(".game").empty()
        $(".game").html("<h2>You got " + Math.round((correctChoices / triviaQuestions.length) * 100) + "%!</h2>")
        console.log(correctChoices);
        console.log(wrongChoices);
    }
}

//this displays a gif between questions based on if you got correct answer or not
function transitionScreen() {
    $(".questionsGoHere").empty();
    $(".answersGoHere").empty();
    $(".submit").hide();
    $(".timer").hide();
    var transitionDiv = $("<img>").addClass("transition");
    if (userChoice === triviaQuestions[currentQuestion].correctAnswer) {
        $(transitionDiv).attr("src", "https://media2.giphy.com/media/3o6MbbKop8X8nJydCU/giphy.gif")
        correctChoices++;
    } else {
        $(transitionDiv).attr("src", "https://lh3.googleusercontent.com/-apYSmkaekcI/VrJsqAmHSYI/AAAAAAAAc6Y/ZW3APRBtWDI/w300-h169/%2527%2527You%2Bcan%2527t%2Bblame%2Bgravity%2Bfor%2Bfalling%2Bin%2Blove%252C%2Bwith%2Bthe%2Bclimb%2527%2527%25EF%25BB%25BF.gif");
        wrongChoices++;
    }
    $(".game").append(transitionDiv);
    setTimeout(function () {
        timeLeft = 15;
        $(".timer").text(timeLeft + " seconds left!")
        currentQuestion++;
        displayQuestion();
    }, 3000)
};







