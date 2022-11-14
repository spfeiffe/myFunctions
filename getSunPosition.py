from datetime import datetime
from suncalc import get_position
import sys

def getSunPosition(lat, long, year, month, day_of_month, hour, minute, my_UTC_offset):
    LAT = float(sys.argv[1])
    LONG = float(sys.argv[2])
    YEAR = int(sys.argv[3])
    MONTH = int(sys.argv[4])
    DAY_OF_MONTH = int(sys.argv[5])
    HOUR = int(sys.argv[6])
    MINUTE = int(sys.argv[7])
    MY_UTC_OFFSET = int(sys.argv[8]) # I know that there are a handful of locales which are offset by a half-hour instead of a full hour, but I am ignoring those for now. 
    #
    hourAdjusted = HOUR + MY_UTC_OFFSET
    thisDateTimeInUTC = datetime(YEAR, MONTH, DAY_OF_MONTH, hourAdjusted, MINUTE)
    #
    g = get_position(thisDateTimeInUTC, LONG, LAT)
    #
    if LAT > 0:
        latPretty = str(abs(LAT)) + chr(176) + " N"
    else:
        latPretty = str(abs(LAT)) + chr(176) + " S"
    if LONG > 0:
        longPretty = str(abs(LONG)) + chr(176) + " E"
    else:
        longPretty = str(abs(LONG)) + chr(176) + " W"
    #
    if HOUR < 12:
        time_12HrClock = str(HOUR) + ":" + thisDateTimeInUTC.strftime("%M") + " AM"
    elif HOUR == 12:
        if MINUTE == 0:
            time_12HrClock = "12:00 Noon"
        else:
            time_12HrClock = "12:" + thisDateTimeInUTC.strftime("%M") + " PM"
    else:
        time_12HrClock = str(HOUR-12) + ":" + thisDateTimeInUTC.strftime("%M") + " PM"
    #
    if len(str(abs(MY_UTC_OFFSET))) == 1:
        utcOffsetPadded = "0" + str(abs(MY_UTC_OFFSET))
    else:
        utcOffsetPadded = str(abs(MY_UTC_OFFSET))
    if MY_UTC_OFFSET < 0:
        utcOffsetPretty = "UTC-" + utcOffsetPadded + ":00"
    else:
        utcOffsetPretty = "UTC+" + utcOffsetPadded + ":00"
    #
    print("")
    print("The position of the sun at (" + latPretty + ", " + longPretty + ") at " + time_12HrClock + " (" + utcOffsetPretty + ") is: ")
    print("\tazimuth = " + str(round(g['azimuth'], 2)) + "; elevation = " + str(round(g['altitude'], 2)))
    print("Need to fix the units (I think)...")

getSunPosition(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8]) 