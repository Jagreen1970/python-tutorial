class Board:
    def __init__(self):
        self.cells = [" " for _ in range(9)]

    def __str__(self):
        return f"""\n
        {"|".join(self.cells[0:3])}
        {"-" * 5}
        {"|".join(self.cells[3:6])}
        {"-" * 5}
        {"|".join(self.cells[6:9])}
        """

    def is_full(self):
        return " " not in self.cells

    def is_valid_move(self, move):
        if move < 0 or move >= 9:
            return False
        return self.cells[move] == " "

    def make_move(self, move, player):
        if self.is_valid_move(move):
            self.cells[move] = player
            return True
        return False

    def get_available_moves(self):
        return [i for i, cell in enumerate(self.cells) if cell == " "]

    def check_winner(self):
        winning_combinations = [
            (0, 1, 2),
            (3, 4, 5),
            (6, 7, 8),  # rows
            (0, 3, 6),
            (1, 4, 7),
            (2, 5, 8),  # columns
            (0, 4, 8),
            (2, 4, 6),  # diagonals
        ]
        for a, b, c in winning_combinations:
            if self.cells[a] == self.cells[b] == self.cells[c] != " ":
                return self.cells[a]
        return None

    def reset(self):
        self.cells = [" " for _ in range(9)]
