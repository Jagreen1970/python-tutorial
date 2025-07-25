import type { Game, CreateGameRequest, JoinGameRequest, GameMove } from "./types" // Assuming these types are declared in a separate file

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export class GameAPI {
  static async getGames(): Promise<Game[]> {
    const response = await fetch(`${API_BASE}/games`)
    if (!response.ok) throw new Error("Failed to fetch games")
    return response.json()
  }

  static async getGame(id: string): Promise<Game> {
    const response = await fetch(`${API_BASE}/games/${id}`)
    if (!response.ok) throw new Error("Failed to fetch game")
    return response.json()
  }

  static async createGame(data: CreateGameRequest): Promise<Game> {
    const response = await fetch(`${API_BASE}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create game")
    return response.json()
  }

  static async joinGame(id: string, data: JoinGameRequest): Promise<Game> {
    const response = await fetch(`${API_BASE}/games/${id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to join game")
    return response.json()
  }

  static async makeMove(id: string, move: GameMove): Promise<Game> {
    const response = await fetch(`${API_BASE}/games/${id}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(move),
    })
    if (!response.ok) throw new Error("Failed to make move")
    return response.json()
  }

  static async spectateGame(id: string, playerName: string): Promise<Game> {
    const response = await fetch(`${API_BASE}/games/${id}/spectate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName }),
    })
    if (!response.ok) throw new Error("Failed to spectate game")
    return response.json()
  }
}
