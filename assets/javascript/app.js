
var ptrTimer;
var ptrQuestion;
var ptrAnswers;
var ptrAnswer;
var ptrCorrect;
var ptrIncorrect;
var ptrTimedOut;
var ptrPause;
var ptrReset;
var ptrRoundCard;
var ptrRestartGame;
var ptrResetGame;
var ptrRoundNumber;
var timer; // = window.setInterval( updateTimer, 1000 );
var secondsPerQuestion = 20;
var secondsRemaining = secondsPerQuestion;
var questionsPerRound = 10;
var round = 1;
var correct = 0;
var incorrect = 0;
var timedOut = 0;
var totalQuestions = 0;
var pauseTimer = false;
var sndCorrect = new Audio( 'assets/sounds/correct.mp3');
var sndInCorrect = new Audio( 'assets/sounds/incorrect.mp3');
var sndShortBeep = new Audio( 'assets/sounds/short_beep.mp3' );
var totalScore = 0;
var roundScore = 0;
var roundRight = 0;
var roundWrong = 0;
var roundsWon = 0;
var roundsLost = 0;


window.onload = function() {
	// console.log( "Window loaded");
	ptrQuestion =  document.getElementById("question");
	ptrA1 =        document.getElementById("a1");
	ptrA2 =        document.getElementById("a2");
	ptrA3 =        document.getElementById("a3");
	ptrA4 =        document.getElementById("a4");
	ptrTimer =     document.getElementById("seconds");
	ptrAnswer =    document.getElementById("answer");
	ptrAnswers =   document.getElementsByClassName("answers");
	ptrCorrect =   document.getElementById("correct");
	ptrIncorrect = document.getElementById("incorrect");
	ptrTimedOut =  document.getElementById("timedout");
	ptrTotalQuestions = document.getElementById("totalquestions");
	ptrPause =     document.getElementById( "pause" );
	ptrReset =     document.getElementById( "restart" );
    ptrRoundCard = document.getElementById( "roundcard" );
	ptrPause.addEventListener( "click", function() { timerControl( "pause" ) } );
	ptrReset.addEventListener( "click", gameReset );
    ptrRoundNumber = document.getElementById("roundnumber");
    ptrRoundResult = document.getElementById("roundresult");
    ptrRoundScore =  document.getElementById("roundscore");
    ptrRoundsWon  =  document.getElementById("roundswon");
    ptrRoundsLost =  document.getElementById("roundslost");
    ptrResetGame  =  document.getElementById("restartgame");
    ptrResetGame.addEventListener("click",gameReset)
    ptrContinueGame  =  document.getElementById("continuegame");
    ptrContinueGame.addEventListener("click", continueGame );
	setupQuestion();

}

function pauseTimer() {
	timerControl( "pause" );
}

function continueGame() {
    pannelControl("hide");
    round++;
    correct = 0;
    incorrect = 0;
    timedOut = 0
    totalQuestions = 0;
    setupQuestion();

}

function gameReset() {
	round = 1
	correct = 0;
	incorrect = 0;
	totalQuestions = 0;
	timedOut = 0;
	timerControl( "stop" );
	resetUsedQuestions();
    pannelControl("hide");
	setupQuestion();
}

function updateTimer() {
	if ( ! pauseTimer ) {
		secondsRemaining--;		
	}
	ptrTimer.innerHTML = secondsRemaining;
    if ( secondsRemaining <= 5 ) {
        sndShortBeep.play();
    }
	if ( secondsRemaining === 0 ) {
        timerControl("stop");
        questionTimedOut();
	}
}

function activateClicks() {
	console.log( "Activating clicker")
	Array.from( ptrAnswers ).forEach( function( item ) {
		console.log( item );
		item.addEventListener( "click", answerSelected );
	});
}

function deactivateClicks() {
	 console.log( "Deactivating cliker");
	Array.from( ptrAnswers ).forEach( function( item ) {
		item.removeEventListener( "click", answerSelected );
	})
}

function timerControl( pAction ) {
    console.log( "Entered timer control, action = '" + pAction + "'" );
	if ( pAction === "start" ) {
		ptrTimer.innerHTML = secondsPerQuestion;
		secondsRemaining = secondsPerQuestion;
		window.clearInterval( timer );  // Ensure that the timer has stopped
		timer = window.setInterval( updateTimer, 1000 );
		pauseTimer = false;
	} else if ( pAction === "stop" ) {
		window.clearInterval( timer );
	} else if ( pAction === "pause" ) {
		console.log( "Pausing timer: " + pauseTimer );
		pauseTimer = ! pauseTimer;
        if ( pauseTimer ) {
            ptrPause.innerHTML = "Resume Game"
        } else {
           ptrPause.innerHTML = "Pause Game" 
        }
	}
}

function answerSelected( item ) {
	console.log( "Answer Selected: " );
	console.log( this );
	console.log( this.getAttribute( "data-correct"));
	// window.clearInterval( timer );
	timerControl( "stop" );
	deactivateClicks();
	if ( this.getAttribute( "data-correct" ) === 'Y' ) {
        roundRight++;
		correct++;
        sndCorrect.play();
        pulseParent( ptrCorrect );
	} else {
        roundWrong++;
		incorrect++;
        sndInCorrect.play();
        pulseParent( ptrIncorrect );
	}
    if ( totalQuestions >= questionsPerRound ) {
        setTimeout( roundOver, 750 );
    } else {
        setTimeout( setupQuestion, 750 );
    }
}

function roundOver() {
    var result;
    console.log( "Round over." );
    timerControl( "stop" );
    if ( roundRight > roundWrong ) {
        ptrRoundResult.innerHTML = "won";  
        roundsWon++;
    } else {
        ptrRoundResult.innerHTML = "lost";
        roundsLost++;
    }
    ptrRoundNumber.innerHTML = round;
    ptrRoundsWon.innerHTML = roundsWon;
    ptrRoundsLost.innerHTML = roundsLost;
    ptrRoundScore.innerHTML = Math.round( ( roundRight / ( roundWrong + timedOut ) ) * 100 );
    pannelControl("show");
    roundRight = 0;
    roundWrong = 0;
}

function pannelControl( pAction ) {
    if ( pAction === "show" ) {
        ptrRoundCard.style.zIndex = 10;
        ptrRoundCard.style.opacity = 1;
    } else if ( pAction === "hide" ) {
        ptrRoundCard.style.opacity = 0;
        setTimeout( function() { ptrRoundCard.style.zIndex = -10 }, 100 );
    }
}

    function questionTimedOut() {
	timedOut++;
    if ( totalQuestions >= questionsPerRound ) {
        roundOver();
    } else { 
	   setupQuestion();
    }
}

function setupQuestion() {
	var question = nextQuestion();
	// console.log( question );
	ptrQuestion.innerHTML = question.question;
	ptrAnswer.innerHTML = question.aPointer;
	ptrA1.innerHTML = question.answers[0];
	ptrA2.innerHTML = question.answers[1];
	ptrA3.innerHTML = question.answers[2];
	ptrA4.innerHTML = question.answers[3];
	var i = ptrAnswers.length;
	while ( i-- ) { ptrAnswers[i].setAttribute("data-correct","N") }
	ptrAnswers[question.aPointer].setAttribute("data-correct", "Y" );

	ptrCorrect.innerHTML = correct;
	ptrIncorrect.innerHTML = incorrect;
	ptrTimedOut.innerHTML = timedOut;
	ptrTotalQuestions.innerHTML = totalQuestions;
	totalQuestions++;
	activateClicks();
	timerControl( "start" );
}

function pulseParent( pPtr ) {
    var ptrParent = pPtr.parentElement;
    console.log( pPtr );
    console.log( ptrParent );
    ptrParent.style.fontSize = "24pt";
    setTimeout( function() { ptrParent.style.fontSize = "16pt" }, 100 );
}


