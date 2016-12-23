
var qlist = [ { 'question': 'Name the largest freshwater lake in the world?',
		   'aPointer': 1,
		   'answers': [ 'Random answer 1',
		                'Lake Superior',
			        'Random answer 2',
			        'Random answer 4' ]
		 },
	      { 'question': 'Where would you find the sea of tranqility?',
	            'aPointer': 3,
		    'answers': [ 'Random answer 1',
		                 'Random answer 2',
				 'Random answer 3',
				 'The moon' ]
		  }
	    ];

console.log( qlist );

console.log( '-------------------------------');

console.log( qlist[1] );

console.log( qlist[1].question );
console.log( qlist[1].aPointer );
console.log( qlist[1].answers );
console.log( qlist[1].answers[ qlist[1].aPointer ] );
