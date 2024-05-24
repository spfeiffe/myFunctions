import os
import subprocess as s
import sys

# I'm having trouble figuring out how to getwd in C++, so I'll just do this instead.
# AbsolutePathOfWorkingDirectoryOfExecutable = 
#with open(os.path.join(os.getcwd(),'exe','AbsolutePathOfWorkingDirectoryOfExecutable.txt'), 'wt') as d: 
#    d.write(os.path.join(os.getcwd(),'exe'))

f = sys.argv[1] + '.cpp'

#compileCommand= 'g++ -std=c++2b -o "' + os.path.join(os.getcwd(),'exe',f[0:(len(f)-4)]+'.out') + '" "' + os.path.join(os.getcwd(),'src',f) + '"' # --verbose' 
compileCommand = 'g++ -std=c++2b -o "' + os.path.join(os.getcwd(),'exe',f[0:(len(f)-4)]+'.exe') + '" "' + os.path.join(os.getcwd(),'src',f) + '"' # --verbose' 

print('building...')

x0 = s.run(compileCommand, shell=True, capture_output=True, text=True)
if x0.returncode != 0:
    with open(os.path.join(os.getcwd(),'build_logs.txt'), 'wt') as stderrFile:
        stderrFile.write('\n'+x0.stderr)
    print('  Build Error ')
else:
    print('... Done.')

# print('running executable...')
# x1 = s.run('"'+os.path.join(os.getcwd(),'exe',f[0:(len(f)-4)]+'.out')+'"', shell=True, capture_output=True, text=True) 
# if x1.returncode != 0:
#    with open(os.path.join(os.getcwd(),'build_logs.txt'), 'wt') as stderrFile:
#        stderrFile.write(x1.stderr)

# input()
