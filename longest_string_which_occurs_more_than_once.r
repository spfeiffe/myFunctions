library(magrittr)
library(assertthat)
get_all_unique_substrings_of_length_n <- function(y, n)
	{
	assert_that(class(y) == "character")
	assert_that(length(y) == 1)
	assert_that(n < nchar(y))
	assert_that(n > 1)
	outChar <- character(0)
	startIndex <- 1
	endIndex <- n
	outChar <- c(outChar, substr(y,startIndex,endIndex))
	# print(paste0("substr(y,", startIndex, ",", endIndex, ") = ", substr(y,startIndex,endIndex)))
	while(endIndex < nchar(y))
		{
		startIndex <- startIndex + 1
		endIndex <- endIndex + 1
		outChar <- c(outChar, substr(y,startIndex,endIndex))
		# print(paste0("substr(y,", startIndex, ",", endIndex, ") = ", substr(y,startIndex,endIndex)))
		}
	return(unique(outChar))
	}
longest_substring_which_occurs_more_than_once <- function(X)
	{
	for (thisLength in (nchar(X)-1):2)
		{
		theseUniqueSubstrings <- get_all_unique_substrings_of_length_n(X, thisLength)
		for (i in 1:length(theseUniqueSubstrings))
			{
			#print(theseUniqueSubstrings[i])
			howManyTimesDoesThisSubstringOccur <- theseUniqueSubstrings[i] %>% gregexpr(., X) %>% unlist() %>% length()
			if (howManyTimesDoesThisSubstringOccur > 1)
				{
				return(theseUniqueSubstrings[i])
				}
			}
		}
	}
longest_substring_which_occurs_more_than_N_times <- function(X, N)
	{
	for (thisLength in (nchar(X)-1):2)
		{
		theseUniqueSubstrings <- get_all_unique_substrings_of_length_n(X, thisLength)
		for (i in 1:length(theseUniqueSubstrings))
			{
			#print(theseUniqueSubstrings[i])
			howManyTimesDoesThisSubstringOccur <- theseUniqueSubstrings[i] %>% gregexpr(., X) %>% unlist() %>% length()
			if (howManyTimesDoesThisSubstringOccur > N)
				{
				return(theseUniqueSubstrings[i])
				}
			}
		}
	}















banana

ba
 an
  na
   an 
    na

get_all_unique_substrings_of_length_n("banana", 2) # should be c("ba", "an", "na").









longest_substring_which_occurs_more_than_once <- function(X)
	{
	for (thisLength in nchar(X):1)
		{
		startIndex <- 1
		endIndex <- thisLength
		paste("X[", startIndex, ":", endIndex, "] = ", X[startIndex:endIndex])
		#print(X[startIndex:endIndex] %>% gregexpr(., X) %>% unlist() %>% length())
		#if (   length(unlist(gregexpr(X[startIndex:endIndex], X))) > 1   )
		#	{
		#	return(X[startIndex:endIndex])
		#	}
		#while (endIndex < nchar(X))
		#	{
		#	print("endIndex < nchar(X)")
		#	startIndex <- startIndex + 1
		#	endIndex <- endIndex + 1
		#	print(X[startIndex:endIndex])
		#	if (   length(unlist(gregexpr(X[startIndex:endIndex], X))) > 1   )
		#		{
		#		return(X[startIndex:endIndex])
		#		}
		#	}
		}
	}

# longest substring which occurs more than once in "gocatcatgo" is "cat".
# 
# gocatcatgo	X[1:10]		1 : thisLength
# 
# gocatcatg 	X[1:9]		1 : thisLength
#  ocatcatgo	X[2:10]		(1+1) : (thisLength+1)
# 
# gocatcat		X[1:8]		1 : thisLength
#  ocatcatg		X[2:9]		(1+1)	:	(thisLength+1)
#   catcatgo	X[3:10]		(1+2)	: 	(thisLength+2)
# 
# gocatca		X[1:7]
#  ocatcat		X[2:8]
#   catcatg		X[3:9]
#    atcatgo	X[4:10]
# 
# gocatc		X[1:6]
#  ocatca		X[2:7]
#   catcat		X[3:8]
#    atcatg		X[4:9]
#     tcatgo	X[5:10]
# 
# gocat
#  ocatc
#   catca
#    atcat
#     tcatg
#      catgo
# 
# goca
#  ocat
#   catc
#    atca
#     tcat
#      catg
#       atgo
# 
# goc
#  oca
#   cat # length(unlist(gregexpr(thisSubString, X))) > 1.  Return thisSubString & exit function.  :)
#    atc
#     tca
#      cat
#       atg
#        tgo
# 
# go
#  oc
#   ca
#    at
#     tc
#      ca
#       at
#        tg
#         go
# 
# g
#  o
#   c
#    a
#     t 
#      c
#       a 
#        t
#         g 
#          o


















"hi"
"say"
"say hi"
"supercalifragilisticexpealidocious"

testString <- "hisaysupercalifragilisticexpealidocioussayhi"
i <- 1
while (i < 6) {
  print(i)
  i <- i + 1
}
longest_substring_which_appears_more_than_once <- function(X)
	{
	for (this_nchar in nchar(X):2)
		{
		
		}
	}

testString <- "hisaysupercalifragilisticexpealidocioussayhisayhi"
"
i
hi
yhi
"




















