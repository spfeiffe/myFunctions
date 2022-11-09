import os
import sys
#print(sys.argv[1])
#print(sys.argv[2])
dir1 = []
dir2 = []
for dirpath, subdirNames, fileNames in os.walk(sys.argv[1], topdown=False):
  for f in fileNames:
    dir1.append( os.path.join(dirpath, f) )
for dirpath, subdirNames, fileNames in os.walk(sys.argv[2], topdown=False):
  for f in fileNames:
    dir2.append( os.path.join(dirpath, f) )
with open("C://Users/spfeiffe//comparingDirs.txt", "a") as outFile:
  for X in dir1:
    outFile.write(X+"\n")
  outFile.write("\n\n\n")
  for X in dir2:
    outFile.write(X+"\n")