export interface Game {
  id: string
  status: "waiting" | "active" | "completed"
  players: {
    x?: string
    o?: string
  }
  board: (string | null)[]
  currentPlayer: "x" | "o"
  winner?: string | "draw"
  createdAt: string
  spectators?: string[]
}

export interface GameMove {
  position: number
  player: "x" | "o"
}

export interface CreateGameRequest {
  playerName: string
}

export interface JoinGameRequest {
  playerName: string
}
