
var targetURL = 'https://opentdb.com/api.php?amount=100&difficulty=medium&type=multiple';
// List of question objects are in qlist[]
var qlist = [];
// usedQuestions tracks what questions have already been used in order to avoid re-use
var usedQuestions = [];

// nextQuestion chooses a question and makes sure that it hasn't already been used

function nextQuestion() {
	for ( var i = 0; i < qlist.length; i++ ) {
		var qix = Math.floor( Math.random() * qlist.length );
		if ( ! usedQuestions[qix] ) { 
			usedQuestions[qix] = 1;
			break;
		}
		console.log( "Question " + qix + " has already been used." );
	}
	return qlist[qix];
}

// Reset used questions resets the usedQuestions array

function resetUsedQuestions() {
  usedQuestions = [];
}
/* loadQuestions makes an ajax call to pull 50 questions from opentdb.com
 * it then coerces the json objects into the object format that I was using 
 * for this module prior to switching to ajax. Each new object is pushed onto
 * into the qlist array.
 * After all questions are loaded it starts the game by executing the callback
 * cbSetupQuestions()
 */
function loadQuestions( cbSetupQuestion ) {
    console.log( "Ajax call to " + targetURL );	

    $.ajax( { 'url': targetURL } )
    .done( function( data, status ) {
        console.log( data );
        for ( var i = 0 ; i < data.results.length; i++ ) {
            var q = {};
            q.question =      data.results[i].question;
            q.correctAnswer = data.results[i].correct_answer;
            q.category =      data.results[i].category;
            q.dificulty =     data.results[i].dificulty;
            var rand = Math.floor( Math.random() * 4 );
            q.aPointer = rand;
            q.answers = [];
            var aPtr = 0;
            for ( var j = 0; j<4; j++ ) {
                q.answers.push( j===rand ? data.results[i].correct_answer : data.results[i].incorrect_answers[aPtr++] )
            }
            qlist.push( q );
        }
        cbSetupQuestion();
    });
}
