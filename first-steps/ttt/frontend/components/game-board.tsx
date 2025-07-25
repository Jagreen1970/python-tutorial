"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Game, GameMove } from "../types/game"

interface GameBoardProps {
  game: Game
  playerName: string
  onMove: (move: GameMove) => void
  isSpectating?: boolean
}

export function GameBoard({ game, playerName, onMove, isSpectating = false }: GameBoardProps) {
  const isPlayerTurn = () => {
    if (isSpectating) return false
    const playerSymbol = game.players.x === playerName ? "x" : "o"
    return game.currentPlayer === playerSymbol && game.status === "active"
  }

  const handleCellClick = (position: number) => {
    if (!isPlayerTurn() || game.board[position]) return

    const playerSymbol = game.players.x === playerName ? "x" : "o"
    onMove({ position, player: playerSymbol })
  }

  const getStatusMessage = () => {
    if (game.status === "waiting") {
      return "Waiting for another player to join..."
    }
    if (game.status === "completed") {
      if (game.winner === "draw") return "Game ended in a draw!"
      return `${game.winner} wins!`
    }
    if (isSpectating) {
      return `${game.currentPlayer.toUpperCase()}'s turn`
    }
    return isPlayerTurn() ? "Your turn!" : `Waiting for ${game.currentPlayer.toUpperCase()}...`
  }

  const getPlayerRole = () => {
    if (isSpectating) return "Spectator"
    return game.players.x === playerName ? "X" : "O"
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-between">
          <span>Tic-Tac-Toe</span>
          <Badge variant={isSpectating ? "secondary" : "default"}>{getPlayerRole()}</Badge>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          <div>X: {game.players.x || "Waiting..."}</div>
          <div>O: {game.players.o || "Waiting..."}</div>
          {game.spectators && game.spectators.length > 0 && <div>Spectators: {game.spectators.length}</div>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-sm font-medium">{getStatusMessage()}</div>

        <div className="grid grid-cols-3 gap-2 aspect-square">
          {game.board.map((cell, index) => (
            <Button
              key={index}
              variant="outline"
              className="aspect-square text-2xl font-bold h-auto bg-transparent"
              onClick={() => handleCellClick(index)}
              disabled={!isPlayerTurn() || !!cell || game.status !== "active"}
            >
              {cell?.toUpperCase() || ""}
            </Button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center">Game ID: {game.id}</div>
      </CardContent>
    </Card>
  )
}
