#Rock Paper Scissor Game

import random

print("\n*********** Rock Paper Scissor ***********")
print(" Created by Arpan Adhikari \n")

user = int(input("Enter a number according to the choice. \n1.Rock ✊ \n2.Paper 🤚 \n3.Scissor ✌️\n"))

computer = random.randint(1,3)

#User Choice
if(user == 1):
    print("You choose ✊")
elif(user == 2):
    print("You choose 🤚")
elif(user == 3):
    print("You choose ✌️")
else:
    print("Please enter a valid number; Choose a number between 1, 2 and 3")
    quit()

#Computer Choice
if(computer == 1):
    print("You choose ✊")
elif(computer == 2):
    print("You choose 🤚")
else:
    print("You choose ✌️")

#Game Time
if(user == computer):
    print("Its a tie!")
elif((user == 1 and computer == 3) or (user == 2 and computer == 1) or (user == 3 and computer == 2)):
    print("Congratulations! You Won")
else:
    print("The computer won!")

