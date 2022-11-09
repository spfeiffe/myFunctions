import json
import sys

with open(sys.argv[1], "r") as fileToBeRead:
    myJson = fileToBeRead.read()

myDict = json.loads(myJson)

# print(myDict)

jsonOut = json.dumps(myDict, separators=(',',':'))

with open(sys.argv[1][:-5]+"_minified.json", "wt") as fileToBeWritten:
    fileToBeWritten.write(jsonOut + " \n")
