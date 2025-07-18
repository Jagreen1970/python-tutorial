class Base:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}!"


class Derived(Base):
    def __init__(self, name, message):
        super().__init__(name)
        self.message = message

    def greet(self):
        base_greeting = super().greet()
        return f"{base_greeting} {self.message}"


if __name__ == "__main__":
    b = Base("Bob")
    d = Derived("Alice", "Welcome to the class!")

    # Demonstrating method overriding
    print(b.greet())  # Calls Base's greet
    print(d.greet())  # Calls Derived's greet
