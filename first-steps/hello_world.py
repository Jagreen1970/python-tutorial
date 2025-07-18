import sys

print("Hello, World!")
print("Python version:", sys.version)


def fibo(n):
    if n < 2:
        return n

    return fibo(n - 2) + fibo(n - 1)


print(f"fibo(6) is {fibo(6)}")
