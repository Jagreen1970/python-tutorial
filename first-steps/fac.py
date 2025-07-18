def fac(n: int) -> int:
    """Calculate the factorial of a number."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    if n == 0 or n == 1:
        return 1
    return n * fac(n - 1)


if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Usage: python fac.py <number>")
        sys.exit(1)
    try:
        number = int(sys.argv[1])
        result = fac(number)
        print(f"The factorial of {number} is {result}.")
    except ValueError as e:
        print(f"Error: {e}")
        sys.exit(1)
