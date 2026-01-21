interleave <- function(X, n)
	{
	# assert_that()
	M <- matrix(nrow=n, data=X, byrow=TRUE)
	# Yes, I could also do this by explicitly using modular arithmetic, but I don't want to. 
	# print(M)
	return(as.vector(M))
	}
test <- c('a','d','g','j','b','e','h','k','c','f','i','l')
cat(test, sep="\n")
cat(interleave(test, 3), sep="\n")
