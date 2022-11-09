import rsa
# from cryptography.fernet import Fernet
(BobPublic, BobPrivate) = rsa.newkeys(512)
hereItIs = rsa.encrypt(b"mySymmetricKeyString", BobPublic)
print(rsa.decrypt(hereItIs, BobPrivate))
