import os
import sys
#os.chdir("C:/Users/spfeiffe/OneDrive - Environmental Protection Agency (EPA)/_mine/test/B")
os.chdir(  os.path.join("C:\Program Files\R\R-4.0.3\library", sys.argv[1])  )
dirSize = 4096 # top-level folder (and each other folder)is 4096 bytes
for dirpath, subdirNames, fileNames in os.walk(os.getcwd()):
  for f in fileNames:
    dirSize += os.path.getsize(os.path.join(dirpath, f))
  for s in subdirNames:
    dirSize += 4096
    #print(os.path.join(dirpath, f) + " is done.  So far, dirSize = " + str(dirSize) + " bytes.")
#in_kiB = round(dirSize/(2**10), 1)
in_MiB = round(dirSize/(2**20), 1)
print("Size of `" + os.getcwd() + "` is approximately " + str(in_MiB) + " MiB.")
