// note: many of these are also included in `math` (not to be confused with the builtin `Math`).
/*
first_vector_PLUS_second_vector
first_vector_MINUS_second_vector
scalar_TIMES_vector
magnitude
dotProduct
multiplyMatrices
findPerp
*/
function first_vector_PLUS_second_vector(a,b)
	{
	return a.map(
				function(value,index, array)
					{
					return Number(value) + Number(b[index]);
					}
				);
	}
function first_vector_MINUS_second_vector(a,b)
	{
	return a.map(
				function(value,index, array)
					{
					return Number(value) - Number(b[index]);
					}
				);
	}
function scalar_TIMES_vector(s,V)
	{
	return V.map(function(X){return X*s;});
	}
function magnitude(V)
	{
	let theSquares = V.map	(
							function(value, index, array)
								{
								return value**2;
								}
							);
	let sumOfTheSquares = theSquares.reduce((a, b) => a + b, 0); // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
	return Math.sqrt(sumOfTheSquares);
	}
function dotProduct(a, b) // https://www.mathsisfun.com/algebra/vectors-dot-product.html
	{
	if ((!Array.isArray(a)) | (!Array.isArray(b)) | (a.length==0) | (b.length==0))
		{
		throw new Error("Both `a` and `b` must be Arrays with the same length, and that length must be >= 1.");
		}
	let myResult = 0;
	for (let i=0; i<a.length; i++)
		{
		myResult += (a[i] * b[i]);
		}
	return myResult;
	}
function multiplyMatrices(a, b)
	{ // https://www.tutorialspoint.com/multiplying-two-matrices-in-javascript-with-different-dimensions 
	if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length)
		{
		throw new Error('arguments should be in 2-dimensional array format');
		}
	let x = a.length;
	let z = a[0].length;
	let y = b[0].length;
	if (b.length !== z) 
		{
		// XxZ & ZxY => XxY
		throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
		}
	let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
	let product = new Array(x);
	for (let p = 0; p < x; p++) 
		{
		product[p] = productRow.slice();
		}
	for (let i = 0; i < x; i++) 
		{
		for (let j = 0; j < y; j++) 
			{
			for (let k = 0; k < z; k++)
				{
				product[i][j] += a[i][k] * b[k][j];
				}
			}
		}
	return product;
	}
function findPerp(knownVector) // easy way to find a vector perpendicular (orthogonal in 2-dimensional space) to `knownVector. https://sciencing.com/vector-perpendicular-8419773.html 
	{
	if ((!Array.isArray(knownVector)) | (knownVector.length != 2))
		{
		throw new Error("`knownVector` must be a JavaScript Array of length 2.");
		}
	let perpX = 1;
	let perpY =     (-1)*(knownVector[0]/knownVector[1])*perpX;
	let perp = 	[
				perpX,
				perpY
				];
	return perp;
	}