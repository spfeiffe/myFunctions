x = "0:A" # U+0030, U+003A, U+0041
for y in x:
  print(hex(ord(y)))
  # print(type(hex(ord(y))))

'''
R,										Python
intToUtf8(),							chr()
utf8ToInt(),							ord()
str2ucp(),								hex(ord()) # sort of
bittermelon::ucp2label(str2ucp('A')),	?
'''
