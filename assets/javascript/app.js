
var ptrTimer;
var ptrQuestion;
var ptrAnswers;
var ptrAnswer;
var ptrCorrect;
var ptrIncorrect;
var ptrTimedOut;
var ptrPause;
var ptrReset;
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


window.onload = function() {
	console.log( "Window loaded");
	ptrQuestion = document.getElementById("question");
	ptrA1 = document.getElementById("a1");
	ptrA2 = document.getElementById("a2");
	ptrA3 = document.getElementById("a3");
	ptrA4 = document.getElementById("a4");
	ptrTimer = document.getElementById("seconds");
	// ptrTimer.innerHTML = secondsPerQuestion;
	ptrAnswer = document.getElementById("answer");
	ptrAnswers = document.getElementsByClassName("answers");
	ptrCorrect = document.getElementById("correct");
	ptrIncorrect = document.getElementById("incorrect");
	ptrTimedOut = document.getElementById("timedout");
	ptrTotalQuestions = document.getElementById("totalquestions");
	ptrPause = document.getElementById( "pause" );
	ptrReset = document.getElementById( "restart" );
	console.log( ptrPause );
	ptrPause.addEventListener( "click", function() { timerControl( "pause" ) } );
	ptrReset.addEventListener( "click", gameReset );
	setupQuestion();

}

function pauseTimer() {
	timerControl( "pause" );
}

function gameReset() {
	round = 1
	correct = 0;
	incorrect = 0;
	totalQuestions = 0;
	timedOut = 0;
	timerControl( "stop" );
	setupQuestion();
}

function updateTimer() {
	if ( ! pauseTimer ) {
		secondsRemaining--;		
	}
	ptrTimer.innerHTML = secondsRemaining;
	if ( secondsRemaining === 0 ) {
		window.clearInterval( timer );
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
	if ( pAction === "start" ) {
		ptrTimer.innerHTML = secondsPerQuestion;
		secondsRemaining = secondsPerQuestion;
		window.clearInterval( timer );  // Ensure that the timer has stopped
		timer = window.setInterval( updateTimer, 1000 );
		pauseTimer = false;
	} else if ( pAction === "stop " ) {
		window.clearInterval( timer );
	} else if ( pAction === "pause" ) {
		console.log( "Pausing timer: " + pauseTimer );
		pauseTimer = ! pauseTimer;
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
		correct++;
	} else {
		incorrect++;
	}
	setupQuestion();
}

function questionTimedOut() {
	timedOut++;
	setupQuestion();
}

function setupQuestion() {
	var question = nextQuestion();
	console.log( question );
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

