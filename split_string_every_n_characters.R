split_string_every_n_characters <- function(string, n)
	{
	myOutput <- character(0)
	N <- as.integer(n)
	assert_that(class(string)=="character")
	assert_that(length(string)==1)
	assert_that(!is.na(N))
	start <- seq(1, nchar(string), N)
	end <- start + (N-1)
	for (i in 1:length(start))
		{
		myOutput <- c	(
						myOutput,
						as.character	(
										na.omit	(
												substring	(
															string, 
															start[i], 
															end[i]
															)
												)
										)
						)
		}
	return(myOutput)
	}