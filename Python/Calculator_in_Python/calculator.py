#Calculator in python

import operator as op
import sys

def calculate(operation,a,b):
    if(operation == 1):
        return op.add(a,b)
    elif(operation == 2):
        return op.sub(a,b)
    elif(operation == 3):
        return op.mul(a,b)
    elif(operation == 4):
        try:
            return op.truediv(a, b)
        except ZeroDivisionError:
            return "Error: Cannot divide by zero."
    elif(operation == 5):
        print("Thank you for using the calculator. Exiting...")
        sys.exit()
    else:
        print('Invalid Operation')



while(True):
    print("-------------- Welcome to Calculator --------------")
    operation = int(input('Enter appropriate number according to operation you want to perform.\n 1. Add\t 2. Subtract\t 3. Multiply\t 4. Divide\t 5.Exit\n'))
    if(operation == 5):
        calculate(5,0,0)
    elif operation not in [1,2,3,4]:
        print("Please enter a valid number for the operation (1-5).\n")
        continue
    else:
        a = int(input('Enter first number\t'))
        b = int(input('Enter second number\t'))
        result = calculate(operation, a, b)
        print(f"The result is {result}. \n")
    