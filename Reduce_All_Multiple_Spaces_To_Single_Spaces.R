RAMSTSS <- # Reduce All Multiple-Spaces To Single-Spaces
  function(stringIn)
	{
	assert_that(class(stringIn) == "character")
	assert_that(length(stringIn) == 1)
	theString <- stringIn
	containsMultiSpaces <- grepl("  ", theString)
	while(containsMultiSpaces)
		{
		theString <- gsub("  ", " ", theString)
		containsMultiSpaces <- grepl("  ", theString)
		}
	return(theString)
	}
# RAMSTSS("A     B  C")