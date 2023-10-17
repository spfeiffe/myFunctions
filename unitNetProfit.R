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
