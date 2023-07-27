# Given the lat/long of 2 points, calculate the compass bearing from one to the other.
getCompassBearing <- function(LAT1, LONG1, LAT2, LONG2)
	{
	lat1  <- (pi/180) * LAT1
	long1 <- (pi/180) * LONG1
	lat2  <- (pi/180) * LAT2
	long2 <- (pi/180) * LONG2
	bearing_in_radians <- atan2	(
								sin(long2-long1) * cos(lat2),
								(cos(lat1) * sin(lat2)) - (sin(lat1) * cos(lat2) * cos(long2-long1))
								)
	bearing_in_degrees <- (180/pi) * bearing_in_radians
	bearing <- (bearing_in_degrees + 360) %% 360 # make sure the bearing is positive
	return(bearing)
	}
getCompassBearing(39.099912, -94.581213, 38.627089, -90.200203) # from Kansas City to St Louis
# 96.51262
getCompassBearing(38.2527, -85.7585, 39.7684, -86.1581) # from Louisville to Indianapolis
# 348.5482
