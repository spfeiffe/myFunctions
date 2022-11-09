import json
import sys

with open(sys.argv[1], "r") as fileToBeRead:
    myJson = fileToBeRead.read()

myDict = json.loads(myJson)

finalOutput = ""

def add_n_spaces_to_s(n,s):
    assert type(n) is int
    assert type(s) is str
    s_out = ""
    for i in range(n):
        s_out += " "
    s_out += s
    return s_out

def add_n_spaces_to_each_line_of_s(n,s):
    assert type(s) is str
    thisList = s.split("\n")
    if len(thisList) == 1:
        return add_n_spaces_to_s(n, thisList[0])
    else:
        newList = []
        for i in range(len(s.split("\n"))):
            newList.append(add_n_spaces_to_s(n, thisList[i]))
        s_out = "\n".join(newList)
        return s_out

def renderAtomic(X):
    myOutput = ""
    if X is None:
        myOutput += "null"
    elif type(X) is str:
        myOutput += '"' + X + '"'
    elif type(X) is int:
        myOutput += str(X)
    elif type(X) is float:
        myOutput += str(X)
    elif type(X) is bool:
        if X is True:
            myOutput += "true"
        else:
            assert X is False
            myOutput += "false"
    return myOutput

def renderContentsOfList(X, numberOfSpaces=4):
    assert type(X) is list
    myOutput = ""
    for i in range(len(X)):
        if X[i] is None or type(X[i]) is str or type(X[i]) is int or type(X[i]) is float or type(X[i]) is bool:  
            myOutput += renderAtomic(X[i])
        elif type(X[i]) is dict:
            myOutput += "{"
            myOutput += "\n"
            renderedContents = renderContentsOfDict(X[i])[:-1] # drop the trailing "\n" 
            #myOutput += add_n_spaces_to_each_line_of_s(numberOfSpaces, renderedContents)
            myOutput += renderedContents
            myOutput += "\n"
            myOutput += "}"
        else:
            assert type(X[i]) is list
            myOutput += "["
            myOutput += "\n"
            renderedContents = renderContentsOfList(X[i])[:-1] # drop the trailing "\n"
            myOutput += add_n_spaces_to_each_line_of_s(numberOfSpaces, renderedContents) 
            myOutput += "\n"
            myOutput += "]"
        if (i+1) != len(X):
            myOutput += ","
        myOutput += "\n"
    return myOutput

def renderContentsOfDict(X):
    assert type(X) is dict
    myOutput = ""
    lengthOfLongestKey = max(list(map(lambda k:len(k), list(X.keys())))) # this line is NOT recursive.
    #print("lengthOfLongestKey = " + str(lengthOfLongestKey))
    for i in range(len(X)):
        k = list(X.keys())[i]
        myOutput += '"' + k + '":'
        howManySpacesToAppend = (lengthOfLongestKey-len(k))+1 
        #print("k = " + str(k))
        #print("howManySpacesToAppend = " + str(howManySpacesToAppend))
        for j in range(howManySpacesToAppend):
            myOutput += " "
        if X[k] is None or type(X[k]) is str or type(X[k]) is int or type(X[k]) is float or type(X[k]) is bool:
            myOutput += renderAtomic(X[k])
        elif type(X[k]) is dict:
            myOutput += "{"
            myOutput += "\n"
            myOutput += add_n_spaces_to_each_line_of_s(lengthOfLongestKey+howManySpacesToAppend+3, renderContentsOfDict(X[k]))
            myOutput += "}"
        else:
            assert type(X[k]) is list
            myOutput += "["
            myOutput += "\n"
            renderedContentsRAW = renderContentsOfList(X[k])[:-1] # drop the trailing "\n"
            renderedContents = add_n_spaces_to_each_line_of_s(4, renderedContentsRAW)
            myOutput += add_n_spaces_to_each_line_of_s(lengthOfLongestKey+4, renderedContents) 
            myOutput += "\n"
            for J in range(len(k)+howManySpacesToAppend+3):
                myOutput += " "
            myOutput += "]"
        if (i+1) != len(X):
            myOutput += ","
        myOutput += "\n"
    return myOutput

def makeItGorgeous(X):
    global finalOutput
    finalOutput += "{"
    finalOutput += "\n"
    finalOutput += renderContentsOfDict(X)
    finalOutput += "}"

# testDict1 = json.loads('{"p1":null,"property2":[["ListWithinList_itemA","ListWithinList_itemB"],{"name":"DictWithinList","dictProperty1":{"name":"DictWithinDict","Dwd_property_1":["DwDp1A",[{"name":"HanaPitana","supercalifragilisticexpealidocious":"SevenComeEleven"},{"name":"All Right!"}]],"Dwd_property_2":"Well, believe it!"}}],"p3":1.5,"p4":true}') 
# testDict2 = json.loads('{"countryName":"USA","states":[{"stateName":"Indiana"},{"stateName":"Kentucky"},{"stateName":"Ohio","counties":[{"countyName":"Butler"},{"countyName":"Hamilton","municipalities":[{"municipalityName":"Colerain Township","notableStreets":["Brehm Rd","Dry Ridge Rd","Springdale Rd"]},{"municipalityName":"Mt Healthy"},{"municipalityName":"St Bernard"}]},{"countyName":"Warren"}]}],"grossGDPinUSD":"21.37T"}') 
# testDict3 = json.loads('{"myStuff":null, "m2":["a",["b1","b2"],"c"], "supercalifragilisticexpealidocious":true}')
# testDict4 = json.loads('{"e":true,"f":[true,{"fa":{"greet1":{"a":"hi1a","b":{"apple":"red","blueberry":"blue"}},"greet2":"hi2"},"fb":"bye"},null],"g":1.5}') 

# print("BEFORE:")
# print(finalOutput)
# print("")
# # makeItGorgeous(testDict1)
# print("AFTER:")
# print(finalOutput)
# print("")

makeItGorgeous(myDict)

with open(sys.argv[1][:-5]+"_gorgeousPrint.json", "wt") as fileToBeWritten:
    fileToBeWritten.write(finalOutput)
