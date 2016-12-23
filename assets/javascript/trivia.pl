# var qlist = [ { 'question': 'Name the largest freshwater lake in the world?',
# 		   'aPointer': 1,
# 		   'answers': [ 'Random answer 1',
# 		                'Lake Superior',
# 			        'Random answer 2',
# 			        'Random answer 4' ]
# 		 },
# 	      { 'question': 'Where would you find the sea of tranqility?',
# 	            'aPointer': 3,
# 		    'answers': [ 'Random answer 1',
# 		                 'Random answer 2',
# 				 'Random answer 3',
# 				 'The moon' ]
# 		  }
# 	    ];
# 
# console.log( qlist );
# 
# console.log( '-------------------------------');
# 
# console.log( qlist[1] );
# 
# console.log( qlist[1].question );
# console.log( qlist[1].aPointer );
# console.log( qlist[1].answers );
# console.log( qlist[1].answers[ qlist[1].aPointer ] );
use strict;
my $i = 0;
my @ans;
my $rand = 0;
print 'var qlist = [';

while ( my $line = <DATA> ) {
    if ( $line =~ m/^\s*\<li\>(.*)<em>(.*)<\/em>/ ) {
        my $q = $1;
        my $a = $2;
        $q =~ s/(<em>|<\/em>)//g;
	$q =~ s/\"//g;
	$q =~ s/\'//g;
        $a =~ s/(<em>|<\/em>)//g;
        $a =~ s/[\.\s]*$//;
	$a =~ s/\"]//g;
	$a =~ s/\'//g;
	my @rand = ( "Random answer 1", "Random answer 2", "Random answer 3", "Random answer 4" );
	$rand[$rand] = $a;
        print "  { 'question': '$q',\n";
        print "    'aPointer':  '$rand',\n";
	print "    'answers': [ ";
	for ( my $i = 0; $i<4; $i++ ) { 
		print "'$rand[$i]' ";
		if ( $i < 3 ) { print ", " }
	}
	print " ] }, \n";
        $i++;
	$rand++;
	$rand = 0 if ( $rand == 4 );
	# last if ( $i > 3 );
    }
}

print "];\n";

print "console.log( qlist );\n";

exit 0;
__DATA__
<page>
    <li>Name the largest freshwater lake in the world? <em>Lake Superior.</em>
    </li>
    <li>Where would you find the Sea of Tranquility? <em>The Moon.</em>
    </li>
    <li>What is someone who shoes horses called? <em>A farrier.</em>
    </li>
    <li>What item of clothing was named after its Scottish inventor? <em>A Mackintosh.</em>
    </li>
    <li>What kind of weapon is a falchion? <em>A sword.</em>
    </li>
    <li>Which word goes before vest, beans and quartet? <em>String.</em>
    </li>
    <li>What is another word for lexicon? <em>Dictionary.</em>
    </li>
    <li>Name the seventh planet from the sun. <em>Uranus.</em>
    </li>
    <li>Who invented the rabies vaccination? <em>Louis Pasteur.</em>
    </li>
    <li>Name the world's biggest island. <em>Greenland.</em>
    </li>
    <li>What is the world's longest river? <em>Amazon.</em>
    </li>
    <li>Name the world's largest ocean. <em>Pacific.</em>
    </li>
    <li>What is the diameter of Earth? <em>8,000 miles.</em>
    </li>
    <li>Where would you find the world's most ancient forest? <em>Daintree Forest north of Cairns, Australia.</em>
    </li>
    <li>Which four British cities have underground rail systems? <em>Liverpool, Glasgow, Newcastle and London.</em>
    </li>
    <li>What is the capital city of Spain? <em>Madrid.</em>
    </li>
    <li>Which country is Prague in? <em>Czech Republic.</em>
    </li>
    <li>Which English town was a forerunner of the Parks Movement and the first city in Europe to have a street tram system? <em>Birkenhead.</em>
    </li>
    <li>Name the film noir actress who starred in <em>I Married a Witch, The Glass Key, So Proudly We Hail! </em>and <em>Sullivan's Travels. Veronica Lake.</em>
    </li>
    <li>What is the oldest film ever made, and when was it made? <em>Roundhay Garden Scene made in 1888.</em>
    </li>
    <li>Which actress has won the most Oscars? <em>Katharine Hepburn, with 4 Oscars and 12 nominations.</em>
    </li>
    <li>Which actress said, "Fasten your seatbelts. It's going to be a bumpy night," in <em>All About Eve</em>? <em>Bette Davis (as Margo Channing.)</em>
    </li>
    <li>Name the director of the <em>Lord of the Rings</em> trilogy. <em>Peter Jackson.</em>
    </li>
    <li>Who played Neo in <em>The Matrix</em>? <em>Keanu Reeves.</em>
    </li>
    <li>Name the actress whose career began at the age of 3, and who went on to star in films such as <em>Contact, Maverick</em> and <em>The Silence of the Lambs? Jodie Foster.</em>
    </li>
    <li>Bray Studios, near Windsor in Berkshire, was home to which famous brand of horror films? <em>Hammer Horror.</em>
    </li>
    <li>In which film did Humphrey Bogart say, "We'll always have Paris?" <em>Casablanca.</em>
    </li>
    <li>Name the world famous gardens situated ten miles outside of London, close to the River Thames. <em>Kew Gardens.</em>
    </li>
    <li>Which popular gardener created Barnsdale Gardens and was the author of many books such as <em>The Ornamental Kitchen Garden</em>, <em>'Gardeners World' Practical Gardening Course</em> and <em>Paradise Gardens</em>? <em>Geoff Hamilton.</em>
    </li>
    <li>Which garden is considered to be among the Seven Wonders of the Ancient World? <em>The Hanging Gardens of Babylon.</em>
    </li>
    <li>What colour is a Welsh poppy? <em>Yellow.</em>
    </li>
    <li>What colour is a Himalayan poppy? <em>Blue.</em>
    </li>
    <li>Name the organic gardener who is almost as famous for his long blond plait as he is for his books such as <em>Going Organic</em> and <em>The Gourmet Gardener</em> and his regular appearances on the BBC radio's <em>Gardener's Question Time. Bob Flowerdew.</em>
    </li>
    <li>Give the alternative name for a Mountain Ash tree. <em>Rowan.</em>
    </li>
    <li>Which kind of bulbs were once exchanged as a form of currency? <em>Tulips.</em>
    </li>
    <li>By which Latin name was Rosa Gallica previously known? <em>Rosa Mundi.</em>
    </li>
    <li>Name the only heavyweight boxing champion to finish his career of 49 fights without ever having been defeated? <em>Rocky Marciano.</em>
    </li>
    <li>Which sport does Constantino Rocca play? <em>Golf.</em>
    </li>
    <li>Name the country where you would find the Cresta Run.<em> Switzerland.</em>
    </li>
    <li>How many times was the Men's Tennis Singles at Wimbledon won by Bjorn Borg? <em>Five</em>
        <em>.</em>
    </li>
    <li>In 2011, which country hosted a Formula 1 race for the first time? <em>India.</em>
    </li>
    <li>Name the game played on a lawn called a 'crown green'. <em>Bowls.</em>
    </li>
    <li>Which chess piece can only move diagonally? <em>A bishop.</em>
    </li>
    <li>Name the only footballer to have played for Liverpool, Everton, Manchester City and Manchester United. <em>Peter Beardsley.</em>
    </li>
    <li>In football, who was nicknamed 'The Divine Ponytail'? <em>Roberto Baggio.</em>
    </li>
    <li>In needlework, what does UFO refer to? <em>An unfinished object.</em>
    </li>
    <li>Name the famous ballet Russian dancer who changed the face of modern ballet. <em>Rudolf Nureyev.</em>
    </li>
    <li>What is the painting 'La Gioconda' more usually known as? <em>The Mona Lisa.</em>
    </li>
    <li>What does the term 'piano' mean? <em>To be played softly.</em>
    </li>
    <li>Name the Spanish artist, sculptor and draughtsman famous for co-founding the Cubist movement. <em>Pablo Picasso.</em>
    </li>
    <li>How many valves does a trumpet have? <em>Three. </em>
    </li>
    <li>Who painted <em>How Sir Galahad, Sir Bors, and Sir Percival were Fed with the Sanc Grael; But Sir Percival's Sister Died by the Way? </em>Dante Gabriel Rossetti.</li>
    <li>If you were painting with tempera, what would you be using to bind together colour pigments? <em>Egg yolk.</em>
    </li>
    <li>What is John Leach famous for making? <em>Pottery.</em>
    </li>
    <li>On what date did the Battle of Culloden take place? <em>16th April 1746.</em>
    </li>
    <li>Who was Henry VIll's first wife? <em>Catherine of Aragon.</em>
    </li>
    <li>Which famous battle between the British Royal Navy and the combined
fleets of the French Navy and Spanish Navy took place on 21st October
1805? <em>Battle of Trafalgar.</em>
    </li>
    <li>Who became the British Prime Minister after Winston Churchill in 1955? <em>Sir Robert Anthony Eden, The 1st Earl of Avon.</em>
    </li>
    <li>When did Margaret Thatcher become Prime Minister? <em>1979.</em>
    </li>
    <li>When did the Cold War end? <em>1989.</em>
    </li>
    <li>Who was the architect who designed the Millennium Dome? <em>Richard Rogers.</em>
    </li>
    <li>When did the Eurostar train service between Britain and France start running? <em>14th November 1994.</em>
    </li>
    <li>When was the euro introduced as legal currency on the world market? <em>1st January 1999.</em>
    </li>
    <li>In publishing, what does POD mean? <em>Print on demand.</em>
    </li>
    <li>Name the author of <em>On Her Majesty's Secret Service, Dr No</em> and <em>Thunderball</em>, among others. <em>Ian Fleming.</em>
    </li>
    <li>Which Shakespeare play features Shylock? <em>The Merchant of Venice.</em>
    </li>
    <li>Who wrote the novel <em>Death in Venice,</em> which was later made into a film of the same name? <em>Thomas Mann.</em>
    </li>
    <li>Who wrote the Vampire Chronicles, which include the novels <em>Armand</em>, <em>Blood and Gold</em> and <em>Interview with the Vampire</em>? <em>Anne Rice.</em>
    </li>
    <li>What is an e-book? <em>A book available in a digital, rather than printed, format.</em>
    </li>
    <li>How tall would a double elephant folio book be? <em>50 inches.</em>
    </li>
    <li>Who wrote the contemporary children's books about mermaids set on the coast of Cornwall? <em>Helen Dunmore.</em>
    </li>
    <li>How old is the world's oldest dictionary? <em>Cuneiform tablets with bilingual Sumerian-Akkadian word-lists have been dated to 2300 BC.</em>
    </li>
    <li>On "Blue Peter", what was John Noakes's dog called? <em>Shep.</em>
    </li>
    <li>Name the BBC series about a shipping line set in Liverpool during the late 1800s. <em>The Onedin Line.</em>
    </li>
    <li>In the TV series <em>Dad's Army</em>, what was Captain Mainwaring's first name? <em>George.</em>
    </li>
    <li>Who invented TV? <em>George Carey, a Boston civil servant, first
thought up television in 1876. John Logie Baird is often quoted as its
inventor but his ideas didn't come along until the 1920's.</em>
    </li>
    <li>What was the most watched UK TV programme of all time? <em>Eastenders, when Den divorced Angie, which drew 30.10 million viewers on 25th December 1986.</em>
    </li>
    <li>Phyllis Nan Sortain Pechey was as famous for her flamboyant
character as for her cookery books and TV show throughout the late 1960s
 to the mid-1970s. By what name was she more usually known? <em>Fanny Cradock.</em>
    </li>
    <li>Which popular BBC series about old collectables began in 1979,
presented by Bruce Parker and Arthur Negus, and is still running to this
 day? <em>Antiques Roadshow.</em>
    </li>
    <li>Which BBC music programme was broadcast weekly between 1964 and 2006? <em>Top of the Pops.</em>
    </li>
    <li>Alastair Burnett, Sandy Gall, Reginald Bosanquet, Alastair Stewart,
Carol Barnes and Trevor McDonald were all regular presenters of which TV
 programme? <em>ITV News at Ten.</em>
    </li>
    <li>What is sushi traditionally wrapped in? <em>Edible seaweed.</em>
    </li>
    <li>May Queen, Wisley Crab, Foxwhelps and Lane's Prince Albert are all species of what? <em>Apples.</em>
    </li>
    <li>What is allspice alternatively known as? <em>Pimento.</em>
    </li>
    <li>What colour is Absynthe? <em>Green.</em>
    </li>
    <li>What flavour is Cointreau? <em>Orange.</em>
    </li>
    <li>If you were to cut a hare into pieces, marinate it in wine and
juniper berries then stew this slowly in a sealed container, what would
this recipe be called? <em>Jugged hare.</em>
    </li>
    <li>Fried tarantulas, eggs boiled just before they're due to hatch, live
 octopus, and puffin hearts eaten raw when still-warm are all
traditional foods—true or false? <em>True.</em>
    </li>
    <li>How many crocus flowers does it take to make a pound of saffron? <em>Up to 75,000 flowers, which is enough to fill an entire football pitch.</em>
    </li>
    <li>Costing around $2,600 per pound and made only to order by Knipschildt, what is the name of this chocolate truffle? <em>Chocopologie.</em>
    </li>
</page>
