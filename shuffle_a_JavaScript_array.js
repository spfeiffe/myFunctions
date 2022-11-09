function SHUFFLE(array) // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	{
	let currentIndex = array.length,  randomIndex;
	//
	// While there remain elements to shuffle...
	while (currentIndex != 0) 
		{
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		//
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
	return array;
	}

function SAMPLE(pickFrom, numberToPick) // replace = false
	{
	let sampleOut = [];
	//
	let Elements = [];
	for (i=0; i<pickFrom.length; i++)
		{
		Elements.push(i);
		}
	//
	let ElementsToPickFrom = SHUFFLE(Elements);
	//
	for (j=0; j<numberToPick; j++) // numberToPick must be <= pickFrom.length
		{
		sampleOut.push(   pickFrom[ElementsToPickFrom[j]]   );
		}
	return sampleOut;
	}