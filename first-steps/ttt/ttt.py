from board import Board


class TicTacToe:
    def __init__(self, player_x_name, player_o_name="Computer"):
        self.player_names = {"X": player_x_name, "O": player_o_name}
        self.board = Board()
        self.current_player = "X"  # Player starts with 'X'

    def print_board(self):
        print("\nCurrent board:")
        print(self.board)
        print(
            f"Player to move: {self.player_names[self.current_player]} ({self.current_player})\n"
        )

    def fetch_move(self):
        if self.player_names[self.current_player] == "Computer":
            return self.fetch_computer_move()
        return self.fetch_player_move()

    def fetch_player_move(self):
        while True:
            move = input(
                f"{self.player_names[self.current_player]} ({self.current_player}), enter your move (1-9): "
            )
            try:
                move = (
                    int(move) - 1
                )  # Convert to 0-based index --> can throw an error if input is not a number
            except ValueError:
                print("Invalid input. Please enter a number between 1 and 9.")
                continue
            return move

    def fetch_computer_move(self):
        import random

        available_moves = self.board.get_available_moves()
        if available_moves:
            move = random.choice(available_moves)
            return move
        return None

    def play(self):
        while True:
            self.print_board()
            move = self.fetch_move()
            if move is not None and self.board.make_move(move, self.current_player):
                # Check for a winner after the move
                winner = self.board.check_winner()
                if winner:
                    self.print_board()
                    print(f"{winner} wins!")
                    break
                if self.board.is_full():
                    self.print_board()
                    print("It's a draw!")
                    break
                # Switch players
                self.current_player = "O" if self.current_player == "X" else "X"


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python ttt.py <player_x_name> [player_o_name]")
        sys.exit(1)
    player_name = sys.argv[1]
    player_o_name = sys.argv[2] if len(sys.argv) == 3 else "Computer"
    game = TicTacToe(player_name, player_o_name)
    game.play()
