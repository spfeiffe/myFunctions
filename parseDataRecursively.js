	/*
	------- A bunch of functions I need -------------------------------------
	*/		
	function assignDepthToAllNodes(X)
	{
	let namesOfAllNodes = recursivelyGetAllValuesOfProperty(X, "name");
	let nodesCompleted = [];
	let myProposedDepths = [];
	for (let i=0; i<namesOfAllNodes.length; i++)
		{
		let thisNode = namesOfAllNodes[i];
		//console.log("now working on `" + thisNode + "`");
		let pathToThisNode = getPathToItemByPropertyValue(X, "name", thisNode);
		if (pathToThisNode == "['']")
			{
			pathToThisNode = "";
			}
		if (pathToThisNode == "")
			{
			// I've been told not to use `eval`, but I've suffered enough and I need this function to work now! 
			eval( "myNestedData" + pathToThisNode + "['depth'] = " + 0 ); 
			} else	{
					eval( "myNestedData" + pathToThisNode + "['depth'] = " + pathToThisNode.match(new RegExp(/children/g)).length ); // Yes, I know this is a "shortcut" way to do it. 
					}
		//console.log("completed `" + thisNode + "`");
		//console.log("");
		}
	}
	// assignDepthToAllNodes(myNestedData);
	// document.getElementById("demo3").innerHTML = JSON.stringify(myNestedData);
function assignUniqueId(X)
	{
	if	(
			(typeof X != "object")
			||
			(Array.isArray(X))
		)
			{
			throw "X must be an object which is not an array";
			}
	X["uniqueId"] = String(Math.ceil(Math.random()*(10**6)));
	if (X["children"])
		{
		if ( ! Array.isArray(X["children"]) )
			{
			throw 'X["children"] must be an array';
			}
		if (X["children"].length > 0)
			{
			X["children"].forEach(assignUniqueId);
			}
		}
	}
function assignLabelToEachLink(X)
	{
	let myLinkLabels = ['apple','banana','orange','grape','cherry','blueberry','kiwi','mango','peach','plum','pear','strawberry'];
	let theRoot;
	if (getPathToItemByPropertyValue(X,"depth",0) == "['']")
		{
		theRoot = X;
		} else	{
				theRoot = eval(X + getPathToItemByPropertyValue(X,"depth",0));
				}
	let namesOfAllNodesExceptRoot = removeItemFromArray	(
														recursivelyGetAllValuesOfProperty(X, "name"), 
														WHICH	(
																recursivelyGetAllValuesOfProperty(X, "name"), 
																"=='" + theRoot["name"] + "'"
																)
														);
	if (myLinkLabels.length != namesOfAllNodesExceptRoot.length)
		{
		throw "`myLinkLabels.length` must equal `namesOfAllNodesExceptRoot.length`";
		}
	for (let i=0; i<namesOfAllNodesExceptRoot.length; i++)
		{
		let thisNode = namesOfAllNodesExceptRoot[i];
		//console.log("thisNode = " + thisNode);
		let pathToThisNode = getPathToItemByPropertyValue(X, "name", thisNode);
		if (pathToThisNode == "['']")
			{
			pathToThisNode = "";
			}
		eval( "myNestedData" + pathToThisNode + "['label_of_link_to_this_node_from_its_parent'] = '" + myLinkLabels[i] + "';"); 
		}
	}
	// assignLabelToEachLink(myNestedData);
	// console.log(myNestedData);
function findAllIndices(string, pattern)
	{
	if (typeof string != 'string')
		{
		throw "`string` must be a string"
		}
	if (string.length < 1)
		{
		throw "`string.length` must be 1 or greater"
		}
	if (typeof pattern != 'string')
		{
		throw "`pattern` must be a string"
		}
	if (pattern.length < 1)
		{
		throw "`pattern.length` must be 1 or greater"
		}
	let myOutput = [];
	if (string.indexOf(pattern) == -1)
		{
		return myOutput;
		}
	let condition = true;
	function reEvaluateCondition(thisString, thisPattern)
		{
		if (thisString.indexOf(thisPattern) == -1)
			{
			condition = false;
			}
		}
	let stringNow = string;
	let loopCounter = 0;
	let cursorSoFar = 0;
	while(condition)
		{
		let lengthOfThisPiece = stringNow.slice(0,stringNow.indexOf(pattern)+pattern.length).length;
		myOutput.push( stringNow.indexOf(pattern) + cursorSoFar);
		cursorSoFar += lengthOfThisPiece;
		stringNow = stringNow.slice( stringNow.indexOf(pattern) + pattern.length );
		loopCounter += 1;
		reEvaluateCondition(stringNow, pattern);
		}
	return myOutput;
	}
	//console.log(findAllIndices("AhiBhiChiDhiE", "hi")); // must be [1, 4, 7, 10].
	//console.log(findAllIndices("AhiBhiChiDhiE", "x"));  // must be [].
	//console.log(findAllIndices("AhiBhiChiD E", " "));   // must be [10].
	//console.log(findAllIndices("AhiBhiChiD E", " ").join(","));   // must be 10.
function getPathToItemByPropertyValue(nestedDataObject, propertyName, propertyValue)
	{
	let raw = recursivelyGetAllValuesOfProperty(nestedDataObject, "name");
	let myOutput = [];
	let foundIt = false;
	function DoIt(nestedDataObject, propertyName, propertyValue)
		{
		for (X in nestedDataObject)
			{
			//console.log("gPTIBPV now working on: `" + X + "`");
			if (foundIt)
				{
				return;
				}
			switch (typeof nestedDataObject[X])
				{
				case "string":
					{
					if (nestedDataObject[X] == propertyValue)
						{
						//console.log("Found it: `" + nestedDataObject[X] + "`");
						foundIt = true;
						}
					break;
					}
				case "object":
					{
					if ( ! Array.isArray(nestedDataObject[X]) )
						{
						throw "hmm... I was expecting an array here...";
						}
					let thisObject = nestedDataObject[X]; // this line is needed to avoid conflicting variable names. 
					let nameOfThisObject = X; // this line is needed to avoid conflicting variable names. 
					if ( recursivelyGetAllValuesOfProperty(thisObject, "name").includes(propertyValue) ) 
						{
						myOutput.push(nameOfThisObject);
						//console.log("pushed: " + X);
						//console.log("");
						for (let i=0; i<thisObject.length; i++)
							{
							//console.log("now working on: " + i);
							if ( recursivelyGetAllValuesOfProperty(thisObject[i], "name").includes(propertyValue) ) 
								{
								myOutput.push(i);
								//console.log("pushed: " + i);
								//console.log("");
								DoIt(thisObject[i], propertyName, propertyValue);
								} else	{
										//console.log("didn't find " + propertyValue)
										//console.log("");
										}
							}
						}
					break;
					}
				}
			}
		}
	DoIt(nestedDataObject, propertyName, propertyValue);
	let myOutputAsString = "['" + myOutput.join("']['") + "']"; 
	//console.log(myOutputAsString);
	return myOutputAsString;
	}
	// console.log( getPathToItemByPropertyValue(myVeryComplexTestData, "name", "Y") );
function IDENTICAL(a, b)
	{
	if ( !Array.isArray(a) || !Array.isArray(b) )
		{
		throw "Dreadfully sorry, old fellow, but I've been taught only to compare arrays, not other types. Keep your chin up, though!"; 
		}
	if (a.length != b.length)
		{
		return false;
		}
	let myOutput = 1;
	for (let i=0; i<a.length; i++)
		{
		if (a[i] != b[i])
			{
			myOutput += -1;
			}
		}
	return myOutput == 1;
	}
function NA_OMIT(x)
	{
	if (! Array.isArray(x) )
		{
		throw "`myArray` must be a JavaScript array";
		}
	if (x.length == 0)
		{
		return [];
		}
	if (x.length == 1)
		{
		if (typeof x[0] !== 'undefined')
			{
			return [x[0]];
			} else	{
					return [];
					}
		}
	let arrayOut = [];
	for (let i=0; i<x.length; i++)
		{
		if (typeof x[i] !== 'undefined')
			{
			arrayOut.push(x[i]);
			}
		}
	return arrayOut;
	}
	// document.getElementById("demo1").innerHTML =          [,,'c','d','e']  ;
	// document.getElementById("demo2").innerHTML = NA_OMIT( [,,'c','d','e'] );
function nestChild	(
					nameOfTheParentToBe,
					label_of_link_to_child_from_parent,
					nameOfTheChildToBeNested
					)
	{
	//console.log("nameOfTheParentToBe:");
	//console.log(nameOfTheParentToBe);
	//console.log("");
	if ( ! recursivelyGetAllValuesOfProperty(myNestedData, "name").includes(nameOfTheParentToBe) )
		{
		console.error("Although I am a powerful function, I am currently configured such that I cannot append a child to its parent until the parent has already been appended to *its parent* in `myNestedData`."); 
		} else	{
				//console.log("nameOfTheParentToBe:");
				//console.log(nameOfTheParentToBe);
				//console.log("label_of_link_to_child_from_parent:")
				//console.log(label_of_link_to_child_from_parent);
				//console.log("nameOfTheChildToBeNested:");
				//console.log(nameOfTheChildToBeNested);
				//console.log("");
				let pathToTheParentToBe_string = getPathToItemByPropertyValue(myNestedData, "name", nameOfTheParentToBe); 
				if (pathToTheParentToBe_string == "['']")
					{
					pathToTheParentToBe_string = "";
					}
				// I've been told not to use `eval`, but I've suffered enough and I need this function to work now! 
				let thingToEval = "myNestedData" + pathToTheParentToBe_string + "['children'].push( {name: '" + nameOfTheChildToBeNested + "', label_of_link_to_this_node_from_its_parent:'" + label_of_link_to_child_from_parent + "', children:[]} );"; 
				//console.log("thingToEval:");
				//console.log(thingToEval);
				//console.log("");
				eval( thingToEval ); 
				//console.log("nested `" + nameOfTheChildToBeNested + "` within `" + nameOfTheParentToBe + "`");
				//console.log("");
				}
	}
function recursivelyGetAllValuesOfProperty(ObjectContainingObjects, propertyName)
	{
	let myOutput = [];
	function DoIt(o, k)
		{
		for (X in o)
			{
			if (X == k)
				{
				myOutput.push(o[X])
				}
			if (typeof o[X] == "object" && o[X] !== null)
				{
				DoIt(o[X], k);
				}
			}
		}
	DoIt(ObjectContainingObjects, propertyName);
	let unique = [];
	myOutput.forEach	(
						function(d)
							{
							if (unique.includes(d))
								{
								throw "Non-unique `name` ('" + d + "' appears more than once)";
								}
							unique.push(d);
							}
						);
	return myOutput;
	}
	//console.log(recursivelyGetAllValuesOfProperty(myVeryComplexTestData, "name"));
function recursivelyGetNumberOfChildren(nestedObject)
	{
	numbersOfChildren = [];
	function DoIt(o)
		{
		if (o.hasOwnProperty("children"))
			{
			//console.log("starting " + o["name"]);
			numbersOfChildren.push(o["children"].length);
			o["children"].forEach(DoIt);
			}
		}
	DoIt(nestedObject);
	return numbersOfChildren
	}
function removeItemFromArray(theArray, indexOfTheItemToBeRemoved)
	{
	if 	(
			(typeof indexOfTheItemToBeRemoved != 'number') 
			||
			( ! Number.isInteger(indexOfTheItemToBeRemoved) )
			||
			(indexOfTheItemToBeRemoved > theArray.length)
			||
			(indexOfTheItemToBeRemoved < 0)
		)
			{
			throw "something is wrong with the `indexOfTheItemToBeRemoved`";
			}
	let arrayOut;
	let head = theArray.slice(0, indexOfTheItemToBeRemoved);
	if (indexOfTheItemToBeRemoved != (theArray.length - 1))
		{
		let tail = theArray.slice(indexOfTheItemToBeRemoved + 1);
		arrayOut = head.concat(tail);
		} else	{
				arrayOut = head;
				}
	return arrayOut;
	}
	// document.getElementById("demo").innerHTML = removeItemFromArray(['a','b','c','d','e'], WHICH(['a','b','c','d','e'], "=='c'"));
function WHICH(myArray, myItemConditionAsAString)
	{
	if (! Array.isArray(myArray) )
		{
		throw "`myArray` must be a JavaScript array";
		}
	if (typeof myItemConditionAsAString != "string")
		{
		throw "`myItemConditionAsAString` must be a string";
		}
	function myItemConditionCallback(X)
		{
		// I've been told not to use `eval`, but I've suffered enough and I need this function to work now! 
		return eval("X " + myItemConditionAsAString); 
		}
	let matches = [];
	for (let i=0; i<myArray.length; i++)
		{
		if (myArray.map(myItemConditionCallback)[i])
			{
			matches.push(i);
			}
		}
	if (matches.length == 1)
		{
		return matches[0];
		} else	{
				return matches;
				}
	}
	//console.log(WHICH(['a','b','c','b','e'], "=='b'")); // must be [1,3]
	//console.log(WHICH([['a','2'],['b','1'],['c','2'],].map(function(X){return X[1]}), "=='2'")); // must be [0,2] 
