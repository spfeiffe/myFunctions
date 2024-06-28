import json
import random

class Piece:
  def __init__(self, Unit, Army, StartingPosition):
    self.id = str(round(random.random() * (10**6)))
    self.unit = Unit
    self.army = Army
    self.startingPosition = StartingPosition
    self.currentPosition = StartingPosition

class Game:
  def __init__(self):
    self.hasBeenBegun = False
    self.hasBeenCompleted = False
    self.board = "standard"
    self.rules = "standard"
    self.moveHistory = []
    self.allPieces = [
    Piece("pawn",  "white",  "a2"),
    Piece("pawn",  "white",  "b2"),
    Piece("pawn",  "white",  "c2"),
    Piece("pawn",  "white",  "d2"),
    Piece("pawn",  "white",  "e2"),
    Piece("pawn",  "white",  "f2"),
    Piece("pawn",  "white",  "g2"),
    Piece("pawn",  "white",  "h2"),
    Piece("rook",  "white",  "a1"),
    Piece("knight","white",  "b1"),
    Piece("bishop","white",  "c1"),
    Piece("queen", "white",  "d1"),
    Piece("king",  "white",  "e1"),
    Piece("bishop","white",  "f1"),
    Piece("knight","white",  "g1"),
    Piece("rook",  "white",  "h1"),
    Piece("pawn",  "black",  "a7"),
    Piece("pawn",  "black",  "b7"),
    Piece("pawn",  "black",  "c7"),
    Piece("pawn",  "black",  "d7"),
    Piece("pawn",  "black",  "e7"),
    Piece("pawn",  "black",  "f7"),
    Piece("pawn",  "black",  "g7"),
    Piece("pawn",  "black",  "h7"),
    Piece("rook",  "black",  "a8"),
    Piece("knight","black",  "b8"),
    Piece("bishop","black",  "c8"),
    Piece("queen", "black",  "d8"),
    Piece("king",  "black",  "e8"),
    Piece("bishop","black",  "f8"),
    Piece("knight","black",  "g8"),
    Piece("rook",  "black",  "h8")
    ]

print("Checkpoint A.")
input()

g = Game()

print("Checkpoint B.")
input()
