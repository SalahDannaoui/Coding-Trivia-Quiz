var startbutton = document.querySelector(".startbutton");
var timerEl = document.querySelector(".timer");
var card = document.querySelector(".Q-card");
var finalscoreEl = document.querySelector(".finalscore");
var endScreen = document.querySelector(".end-screen");
var startTitle = document.querySelector(".start-title");
var score = 1000000;
var timer = 20;
timerEl.textContent = "Time left: " + timer + " seconds";
var timerInterval;
var answerbtn = document.querySelector(".answerbuttons");
var submitbtn = document.querySelector(".submitbtn");
var initialsEl = document.querySelector("#initials");
endScreen.style.display = "none";
card.style.display = "none";
var delhighscores = document.querySelector(".byescores");
var hsListEl = document.querySelector(".hs-list");
var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
var questionIndex = 0;
var questions = [
    {
      prompt: 'How do you declare a string in JavaScript?',
      choices: ['var string="string"', 'var string = string', 'var string=[string]', 'var string = text.string'],
      answer: 'var string="string"',
    },
    {
      prompt: 'In an if / else statement, how do you check if the type and value of two variables are equal?',
      choices: ['if (x==y)', 'if (x=y)', 'if (x===y)', 'if (x====y)'],
      answer: 'if (x===y)',
    },
    {
      prompt: 'Objects in JavaScript are separated by?',
      choices: ['commas','semi-colon','quotes','ampersands'],
      answer: 'commas',
    },
    {
      prompt:'What is not a JavaScript framework?',
      choices: ['JQuery', 'Day.JS', 'JQuery UI', 'Bootstrap'],
      answer: 'Bootstrap',
    },
   
  ];


function setTime(){
    timerInterval = setInterval (function () {
        timer--;
        console.log(timer);
        timerEl.textContent = "Time left: " + timer + " seconds";
        if (timer=== 0){
            endgame();
        }
    }, 1000);

}

function startgame() {
    // start timer
    //button disappears
    
    startTitle.style.display = "none";
    card.style.display = "flex";
    setTime ();
    //starts question 1 and answers
    loadquestions();
    
    //right or wrong answer (if wrong, timer down)
    //when Q answered, next Q
    //highscore section
    
    
    console.log(startgame); 
}
console.log(loadquestions);
function loadquestions() {

    if (questionIndex<questions.length) {

        var questionEl = document.querySelector(".questions");

        questionEl.textContent = questions[questionIndex].prompt;
        console.log(questionEl);

        answerbtn.innerHTML = '';    
        
        for( var i = 0; i<questions[questionIndex].choices.length;i++){

            var optionbtn = document.createElement('button');
            var optionvalue = questions[questionIndex].choices[i];
            optionbtn.setAttribute('value', optionvalue);
            optionbtn.textContent = questions[questionIndex].choices[i];
            answerbtn.appendChild(optionbtn);
        }

    } else {
        endgame();        
    }
    
}
function checkanswer(event) {
    if (event.target.value === questions[questionIndex].answer) {
        score = score += 50000000;
        timer += 15
        console.log("right answer");
        var answerResult = document.createElement("span","Woohoo! Correct! 50 MILLION POINTS!!");
    } else {
        score -=60000000;
        timer -= 15;
        console.log("wrong answer");
        if (timer<0){
            timer=0;
            endgame();
        }
        timerEl.textContent = "Time left: " + timer + " seconds";
    }
    questionIndex++;

    loadquestions();
}

function endgame() {
    clearInterval(timerInterval);
    finalscoreEl.textContent = score;
    endScreen.style.display = "flex";
    card.style.display = "none";
    submitbtn.addEventListener("click", savescore);
    questionIndex = 0;
}
  
function savescore() {
    highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    var initials = initialsEl.value.trim();
    var finalscore = {
        score: score,
        initials: initials,
    };

    highscores.push(finalscore);
    highscores.sort(function (a, b) {return b.score - a.score});
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
   
    window.location.reload();
    
}


function printscore() {
    if (highscores.length>0){
      for (var i = 0; i< highscores.length; i++) {
        var listitem = document.createElement('li');
        listitem.textContent = highscores[i].initials + ': ' + highscores[i].score;

        hsListEl.appendChild(listitem);
      }

    }
}

function byescores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }

printscore();
startbutton.addEventListener("click", startgame);
answerbtn.addEventListener("click", checkanswer);
delhighscores.addEventListener("click", byescores);





// Acceptance Criteria

// WHEN I click the start button. eventlistener
// THEN a timer starts and I am presented with a question. count
// WHEN I answer a question
//says if right or wrong
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score