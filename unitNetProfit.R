# Assume unbounded/infinite demand.
# Challenge: set unitPrice such that unitNetProfit is maximized.

# unitProductionAndStorageCost <- given.

#unitCost <- unitSellingCost + unitProductionAndStorageCost

#unitSellingCost <-	ARFOPIMFWIM + 		# Amazon's Referral Fee Or Per-Item Minimum Fee, Whichever Is More. 
#					IIFTOMTASFEFBAF +	# (recommend FBA) # If I Fulfill The Order Myself, Then Amazon's Shipping Fee, Else Fulfillment By Amazon (FBA) Fee 
#					# ITIIITMCTAVCF +		# If This Item Is In The `Media` Category, Then Amazon's Variable Closing Fee 
#					taxes

#unitGrossProfit <- unitPrice - unitCost




# Given unitCost, set unitPrice such that, assuming infinite demand, unitNetProfit is optimized.

resultsMat <- matrix(nrow=0, ncol=6, dimnames=list(NULL,
	c("unitCost", "unitPrice", "taxes", "paymentProcessingFee", "unitGrossProfit", "unitNetProfit")))

crunch <- function (unitPrice, unitCost=10.00)
	{
	Ceil <- function(X)
		{
		ceiling(X*100)/100
		}
	printPrettyCurrency <- function(X)
		{
		format(X, nsmall=2)
		}
	#
	taxes <- Ceil(0.08*unitPrice)
	paymentProcessingFee <- Ceil(((2.29/100)*(unitPrice+taxes))+0.09)
	#
	unitGrossProfit <- unitPrice - unitCost
	unitNetProfit <- unitGrossProfit - (taxes + paymentProcessingFee)
	#
	resultsMat <<- rbind	(
						resultsMat,
						c	(
							printPrettyCurrency(unitCost),
							printPrettyCurrency(unitPrice),
							printPrettyCurrency(taxes),
							printPrettyCurrency(paymentProcessingFee),
							printPrettyCurrency(unitGrossProfit),
							printPrettyCurrency(unitNetProfit)
							)
						)
	}

crunch(11.00)
crunch(12.00)
crunch(13.00)
crunch(14.00)
crunch(15.00)
crunch(16.00)
crunch(17.00)
crunch(18.00)
crunch(19.00)
crunch(20.00)

resultsMat
