
var targetURL = 'https://opentdb.com/api.php?amount=100&difficulty=medium&type=multiple';

var qlist = [];

var usedQuestions = [];

//loadQuestions();

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

function resetUsedQuestions() {
  unedQuestions = [];
}

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
/*
for ( var i = 0; i<qlist.length; i++ ) {

	console.log( nextQuestion() );

}
*/
