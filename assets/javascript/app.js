
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
var ptrCategory;
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

/* onload grabs the pointers to the DOM objects that we'll be needing. 
 * it also set us the needed event listeners.
 * Finally, it calls out to loadQuestions which loads the
 * questions with an ajax call then starts the game by 
 * calling back to setUpQuestion()
 */

window.onload = function() {
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
    ptrRoundNumber = document.getElementById("roundnumber");
    ptrRoundResult = document.getElementById("roundresult");
    ptrRoundScore =  document.getElementById("roundscore");
    ptrRoundsWon  =  document.getElementById("roundswon");
    ptrRoundsLost =  document.getElementById("roundslost");
    ptrResetGame  =  document.getElementById("restartgame");
    ptrCategory   =  document.getElementById("category");
	ptrPause.addEventListener( "click", function() { timerControl( "pause" ) } );
	ptrReset.addEventListener( "click", gameReset );
    ptrResetGame.addEventListener("click",gameReset)
    ptrContinueGame  =  document.getElementById("continuegame");
    ptrContinueGame.addEventListener("click", continueGame );
	loadQuestions( setupQuestion );

}

function pauseTimer() {
	timerControl( "pause" );
}
// reset counters and start a new round.
function continueGame() {
    pannelControl("hide");
    round++;
    correct = 0;
    incorrect = 0;
    timedOut = 0
    totalQuestions = 0;
    setupQuestion();

}
// Reset the whole game, clearing the uesd questions flags.
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
// This is a callback to that updates the timer value on the page
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
// Activates the click events on the answers
function activateClicks() {
	console.log( "Activating clicker")
	Array.from( ptrAnswers ).forEach( function( item ) {
		console.log( item );
		item.addEventListener( "click", answerSelected );
	});
}
// Deactivates the click events on the answers
function deactivateClicks() {
	 console.log( "Deactivating cliker");
	Array.from( ptrAnswers ).forEach( function( item ) {
		item.removeEventListener( "click", answerSelected );
	})
}
/* This is a single point for controlling game timer, start, stop, and pause
 * are controlled via this function.
 */
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
/* When an answer is selected the result is evaluated here
 * the correct answer is show to the user via the answerColors() call
 */
function answerSelected( item ) {
	timerControl( "stop" );
	deactivateClicks();
    answerColors( "show" );
	if ( this.getAttribute( "data-correct" ) === 'Y' ) {
        roundRight++;
		correct++;
        sndCorrect.play();
        ptrCorrect.innerHTML = correct;
        pulseParent( ptrCorrect );
	} else {
        roundWrong++;
		incorrect++;
        sndInCorrect.play();
        ptrIncorrect.innerHTML = incorrect;
        pulseParent( ptrIncorrect );
	}
    
    setTimeout( function() {
        answerColors("normal");
    }, 750 );
    
    if ( totalQuestions >= questionsPerRound ) {
        setTimeout( roundOver, 750 );
    } else {
        setTimeout( setupQuestion, 750 );
    }
}
/* When a round is over this manages the evaluation and display of the results.
 * A hidden (z-index = -100, opacity = 0) panel is faded in showing the results.
 */
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
    console.log( "roundRight = " + roundRight );
    console.log( "roundWrong = " + roundWrong );
    console.log( "timedOut = " + timedOut );
    ptrRoundScore.innerHTML = Math.round( ( roundRight / questionsPerRound ) * 100 );
    pannelControl("show");
    roundRight = 0;
    roundWrong = 0;
}
// This raises or lowers the results pannel
function pannelControl( pAction ) {
    if ( pAction === "show" ) {
        ptrRoundCard.style.zIndex = 10;
        ptrRoundCard.style.opacity = 1;
    } else if ( pAction === "hide" ) {
        ptrRoundCard.style.opacity = 0;
        setTimeout( function() { ptrRoundCard.style.zIndex = -10 }, 100 );
    }
}

// If the timer runs down to zero this is called
function questionTimedOut() {
	timedOut++;
    if ( totalQuestions >= questionsPerRound ) {
        roundOver();
    } else { 
        deactivateClicks();
        setTimeout( function() { setupQuestion() }, 750 );
    }
}

// This set up the next question and starts the timer
function setupQuestion() {
	var question = nextQuestion();
	// console.log( question );
	ptrQuestion.innerHTML = question.question;
    ptrCategory.innerHTML = question.category;
	ptrAnswer.innerHTML = question.aPointer;
	ptrA1.innerHTML = question.answers[0];
	ptrA2.innerHTML = question.answers[1];
	ptrA3.innerHTML = question.answers[2];
	ptrA4.innerHTML = question.answers[3];
    console.log( ptrAnswers );
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

/*This pulses (enlarges and shrinks) the parent div, it's used everytime the 
 * "correct" or "wrong" count is incremented to bring the attention of the user 
 * to the new score values
 */
function pulseParent( pPtr ) {
    var ptrParent = pPtr.parentElement;
    console.log( pPtr );
    console.log( ptrParent );
    ptrParent.style.fontSize = "24pt";
    setTimeout( function() { ptrParent.style.fontSize = "16pt" }, 100 );
}

// Dims the wrong answers and changes the right answer to green.
function answerColors( pAction ) {
    var s1;
    if ( pAction === "show" ) {
        
        s1 = document.querySelectorAll('[data-correct="N"]');
        Array.from( s1 ).forEach( function( item ) { 
            item.style.opacity = .2;
            console.log( item );
        });
        
        s1 = document.querySelectorAll('[data-correct="Y"]');
        Array.from( s1 ).forEach( function( item ) { 
            item.style.color = 'green' 
        });
    } else if ( pAction === "normal" ) {
        
        s1 = document.querySelectorAll('[data-correct]');
        Array.from( s1 ).forEach( function( item ) { 
            item.style.opacity = 1;
            item.style.color = "#373737";
            item.style.cssText = '.answer:hover { color: darkred}';
        });

    }
}
