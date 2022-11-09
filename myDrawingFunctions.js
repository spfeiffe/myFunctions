// require `myVectorAlgebraFunctions.js`
/*
intersectionPoint
draw_line
get_curve_path
draw_arrow_with_straight_parts
draw_arrow
*/
function intersectionPoint(line1start, line1end, line2start, line2end) // http://paulbourke.net/geometry/pointlineplane/
	{
	if	(
		(!Array.isArray(line1start)) ||
		(!Array.isArray(line1end)) ||
		(!Array.isArray(line2start)) ||
		(!Array.isArray(line2end)) ||
		(line1start.length!=2) ||
		(line1end.length!=2) ||
		(line2start.length!=2) ||
		(line2end.length!=2)
		)
			{
			throw new Error("In my function intersectionPoint(), `line1start`, `line1end`, `line2start`, and `line2end` must each be a JavaScript Array of length = 2.");
			}
	if	(
			(
			magnitude	(
						first_vector_MINUS_second_vector(line1end, line1start)
						) == 0
			) ||
			(
			magnitude	(
						first_vector_MINUS_second_vector(line2end, line2start)
						) == 0
			)
		)
			{
			throw new Error("In my function intersectionPoint(), magnitude of each line must be greater than 0.");
			}
	let x1 = line1start[0];
	let y1 = line1start[1];
	let x2 = line1end[0];
	let y2 = line1end[1];
	let x3 = line2start[0];
	let y3 = line2start[1];
	let x4 = line2end[0];
	let y4 = line2end[1];
	// most of the below was provided by webpages/fora which got it from http://paulbourke.net/geometry/pointlineplane/.
	let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
	if (denominator === 0) 	
		{
		throw new Error("In my function intersectionPoint(), these lines are parallel.");
		}
	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1)
		{
		throw new Error("In my function intersectionPoint(), although the lines are not parallel and therefore must intersect at some point, the intersection point is not within the segments provided.");
		}
	let x = x1 + ua * (x2 - x1);
	let y = y1 + ua * (y2 - y1);
	return [x, y]; // Return a JavaScript Array with the x and y coordinates of the intersection.
	}
	//console.log("intersectionPoint([0,0], [4,5], [2,5], [6,1]) = " + intersectionPoint([0,0], [3,4], [2,5], [6,1]) + " (must be [3,4].)");
	/* R plot showing that 
	`intersectionPoint([0,0], [30,40], [0,0], [1,-0.75])` 
	gives the correct result: 
	# plot(-1000:1000, -1000:1000, col='white')
	# abline(0, (-40/30))
	# abline(0, (0.75))
	# points(0, 0, type='p', pch=16, cex=1)
	# points(80, -2.5, type='p', pch=16, cex=1, col='green')
	# points(320, -322.5, type='p', pch=16, cex=1, col='red')
	*/
function draw_line(SP, EP)
	{
	if ((!Array.isArray(SP)) | (!Array.isArray(EP)) | (SP.length!=2) | (EP.length!=2))
		{
		throw new Error("Both `SP` and `EP` must be JavaScript Arrays of length = 2.");
		}
	let theLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
	// theCurve.setAttribute("id", "theLine");
	theLine.setAttribute(
						"d", 
						"M " + SP[0] + " " + SP[1] + " L " + EP[0] + " " + EP[1] 
						);
	theLine.setAttribute("style", "fill:none; stroke-width:3; stroke:black");
	document.getElementById("myCanvas").appendChild(theLine);
	}
function get_curve_path(
						SP, // Starting Point
						// SCP, // Starting Control Point
						// ECP, // Ending Control Point
						EP, // Ending Point
						controlPointsProportionParallel=0.1, // how far along `the_line_from_SP_to_EP` you want the control points to be.
						controlPointsProportionPerpendicular=0.1, // how far out perpendicular to `the_line_from_SP_to_EP` you want to drag the control points.
						concavity="up"
						)
	{
	if ((!Array.isArray(SP)) | (!Array.isArray(EP)) | (SP.length!=2) | (EP.length!=2))
		{
		throw new Error("Both `SP` and `EP` must be JavaScript Arrays of length = 2.");
		}
	if ((controlPointsProportionParallel == 0) || (controlPointsProportionPerpendicular == 0))
		{
		throw new Error("Both `controlPointsProportionParallel` and `controlPointsProportionPerpendicular` must be > 0.");
		}
	if (!["up","down"].includes(concavity))
		{
		throw new Error("In my function draw_curve(), the parameter/argument `concavity` must be either 'up' or 'down'.");
		}
	//
	let the_vector_you_add_to_SP_in_order_to_get_EP = first_vector_MINUS_second_vector(EP, SP);
	//
	let the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP = first_vector_PLUS_second_vector	(
																													SP,
																													scalar_TIMES_vector	(
																																		controlPointsProportionParallel,
																																		the_vector_you_add_to_SP_in_order_to_get_EP
																																		)
																													);
	let the_intersecting_perpendicular_for_SCP;
	if (concavity == "up")
		{
		the_intersecting_perpendicular_for_SCP = findPerp	(
															the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP
															);
		} else	{
				the_intersecting_perpendicular_for_SCP = scalar_TIMES_vector	(
																				-1,
																				findPerp	(
																							the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP
																							)
																				);
				}
	let SCP = first_vector_PLUS_second_vector	(
												the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP,
												scalar_TIMES_vector	(
																	(controlPointsProportionPerpendicular * magnitude(the_vector_you_add_to_SP_in_order_to_get_EP)),
																	the_intersecting_perpendicular_for_SCP
																	)
												);
	/*
	console.log("the_vector_from_which_we_will_find... = " + the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP);
	console.log("the_intersecting_perpendicular = " + the_intersecting_perpendicular_for_SCP);
	console.log("dot product of the two = " + dotProduct(the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP, the_intersecting_perpendicular_for_SCP));
	console.log("intersection point = " + intersectionPoint([0,0], the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_SCP, [0,0], the_intersecting_perpendicular_for_SCP));
	console.log("SCP = " + SCP);
	*/
	let the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP = first_vector_PLUS_second_vector	(
																													SP,
																													scalar_TIMES_vector	(
																																		(1-controlPointsProportionParallel),
																																		the_vector_you_add_to_SP_in_order_to_get_EP
																																		)
																													);
	let the_intersecting_perpendicular_for_ECP;
	if (concavity == "up")
		{
		the_intersecting_perpendicular_for_ECP = findPerp	(
															the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP
															); 
		} else	{
				the_intersecting_perpendicular_for_ECP = scalar_TIMES_vector	(
																				-1,
																				findPerp	(
																							the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP
																							),
																				);
				}
	let ECP = first_vector_PLUS_second_vector	(
												the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP,
												scalar_TIMES_vector	(
																	((controlPointsProportionPerpendicular * magnitude(the_vector_you_add_to_SP_in_order_to_get_EP)) * 2),
																	the_intersecting_perpendicular_for_ECP
																	)
												); 
	/*
	console.log("");
	console.log("");
	console.log("");
	console.log("the_vector_from_which_we_will_find... = " + the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP);
	console.log("the_intersecting_perpendicular = " + the_intersecting_perpendicular_for_ECP);
	console.log("dot product of the two = " + dotProduct(the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP, the_intersecting_perpendicular_for_ECP));
	console.log("intersection point = " + intersectionPoint([0,0], the_vector_from_which_we_will_find_the_intersecting_perpendicular_for_ECP, [0,0], the_intersecting_perpendicular_for_ECP));
	console.log("ECP = " + ECP);
	*/
	//
	return "M " + SP[0] + " " + SP[1] + " C " + SCP[0] + " " + SCP[1] + " " + ECP[0] + " " + ECP[1] + " " + EP[0] + " " + EP[1];
	}
function draw_arrow_with_straight_parts	(
					fromPoint, 
					toPoint,
					parallelControlProportion=0.1,
					perpendicularControlProportion=0.1,
					concavity="up",
					relativeLengthOfTheStraightParts=0.05 // as a percentage of magnitude(theArrow).
					)
	{
	if ((!Array.isArray(fromPoint)) | (!Array.isArray(toPoint)) | (fromPoint.length!=2) | (toPoint.length!=2))
		{
		throw new Error("In my function draw_arrow(), both `fromPoint` and `toPoint` must be JavaScript Arrays of length = 2.");
		}
	let the_vector_you_add_to_fromPoint_in_order_to_get_toPoint = first_vector_MINUS_second_vector(toPoint, fromPoint);
	let thePointAtWhichTheArrowStartsToCurve = first_vector_PLUS_second_vector	(
																				fromPoint,
																				scalar_TIMES_vector	(
																									relativeLengthOfTheStraightParts,
																									the_vector_you_add_to_fromPoint_in_order_to_get_toPoint
																									)
																				);
	let pathOfStraightPartAtTheBeginningOfTheArrow = "M " + fromPoint[0] + " " + fromPoint[1] + " L " + thePointAtWhichTheArrowStartsToCurve[0] + " " + thePointAtWhichTheArrowStartsToCurve[1]; 
	let thePointAtWhichTheArrowStopsCurving = first_vector_PLUS_second_vector	(
																				fromPoint,
																				scalar_TIMES_vector	(
																									(1-relativeLengthOfTheStraightParts),
																									the_vector_you_add_to_fromPoint_in_order_to_get_toPoint
																									)
																				);
	let pathOfStraightPartAtTheEndOfTheArrow = "M " + thePointAtWhichTheArrowStopsCurving[0] + " " + thePointAtWhichTheArrowStopsCurving[1] + " L " + toPoint[0] + " " + toPoint[1]; 
	let pathOfCurvedPart = get_curve_path(thePointAtWhichTheArrowStartsToCurve, thePointAtWhichTheArrowStopsCurving);
	//
	let theArrow = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  //theArrow.setAttribute("id", "theArrow");
	let straightPartAtTheBeginningOfTheArrow =  document.createElementNS("http://www.w3.org/2000/svg", "path");
		straightPartAtTheBeginningOfTheArrow.setAttribute	(
															"d",
															pathOfStraightPartAtTheBeginningOfTheArrow
															);
		straightPartAtTheBeginningOfTheArrow.setAttribute	("style", "fill:none; stroke-width:3; stroke:black");
	let curvedPart = document.createElementNS("http://www.w3.org/2000/svg", "path");
		curvedPart.setAttribute	(
								"d",
								pathOfCurvedPart
								);
		curvedPart.setAttribute	("style", "fill:none; stroke-width:3; stroke:black");
	let straightPartAtTheEndOfTheArrow =  document.createElementNS("http://www.w3.org/2000/svg", "path");
		straightPartAtTheEndOfTheArrow.setAttribute	(
													"d",
													pathOfStraightPartAtTheEndOfTheArrow
													);
		straightPartAtTheEndOfTheArrow.setAttribute	("style", "fill:none; stroke-width:3; stroke:black");
		straightPartAtTheEndOfTheArrow.setAttribute	("marker-end", "url(#arrowhead)");
	let codeContainerForArrowHead = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	let theArrowHead = document.createElementNS("http://www.w3.org/2000/svg", "marker");
		theArrowHead.setAttribute("id", "arrowhead");
		theArrowHead.setAttribute("markerWidth", "10");
		theArrowHead.setAttribute("markerHeight", "7");
		theArrowHead.setAttribute("refX", "0");
		theArrowHead.setAttribute("refY", "3.5");
		theArrowHead.setAttribute("orient", "auto");
	let theArrowHeadPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); 
		theArrowHeadPolygon.setAttribute("points", "0 0, 10 3.5, 0 7");
	theArrowHead.appendChild(theArrowHeadPolygon);
	codeContainerForArrowHead.appendChild(theArrowHead);
	document.getElementById("myCanvas").appendChild(codeContainerForArrowHead);
	theArrow.appendChild(straightPartAtTheBeginningOfTheArrow);
	theArrow.appendChild(curvedPart);
	theArrow.appendChild(straightPartAtTheEndOfTheArrow);
	document.getElementById("myCanvas").appendChild(theArrow);
	}
function draw_arrow	(
					fromPoint, 
					toPoint,
					parallelControlProportion=0.1,
					perpendicularControlProportion=0.1,
					concavity="up",
					)
	{
	if ((!Array.isArray(fromPoint)) | (!Array.isArray(toPoint)) | (fromPoint.length!=2) | (toPoint.length!=2))
		{
		throw new Error("In my function draw_arrow(), both `fromPoint` and `toPoint` must be JavaScript Arrays of length = 2.");
		}
	let the_vector_you_add_to_fromPoint_in_order_to_get_toPoint = first_vector_MINUS_second_vector(toPoint, fromPoint);
	let pathOfCurvedPart = get_curve_path(fromPoint, toPoint, parallelControlProportion, perpendicularControlProportion, concavity);
	//
	let theArrow = document.createElementNS("http://www.w3.org/2000/svg", "g");
		//theArrow.setAttribute("id", "theArrow");
		theArrow.setAttribute("class", "myArrow");
	let curvedPart = document.createElementNS("http://www.w3.org/2000/svg", "path");
		curvedPart.setAttribute	(
								"d",
								pathOfCurvedPart
								);
		curvedPart.setAttribute	("style", "fill:none; stroke-width:3; stroke:black");
		curvedPart.setAttribute	("marker-end", "url(#arrowhead)");
	let codeContainerForArrowHead = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	let theArrowHead = document.createElementNS("http://www.w3.org/2000/svg", "marker");
		theArrowHead.setAttribute("id", "arrowhead");
		theArrowHead.setAttribute("markerWidth", "10");
		theArrowHead.setAttribute("markerHeight", "13");
		theArrowHead.setAttribute("refX", "5");
		theArrowHead.setAttribute("refY", "0");
		//theArrowHead.setAttribute("orient", "auto");
	let theArrowHeadPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); 
		theArrowHeadPolygon.setAttribute("points", "5 0, 10 0, 5 13, 0 0, 5 0");
	theArrowHead.appendChild(theArrowHeadPolygon);
	codeContainerForArrowHead.appendChild(theArrowHead);
	document.getElementById("myCanvas").appendChild(codeContainerForArrowHead);
	theArrow.appendChild(curvedPart);
	document.getElementById("myCanvas").appendChild(theArrow);
	}