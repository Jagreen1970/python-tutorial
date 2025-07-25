"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, Clock } from "lucide-react"
import type { Game } from "../types/game"

interface GameListProps {
  games: Game[]
  onJoinGame: (gameId: string) => void
  onSpectateGame: (gameId: string) => void
}

export function GameList({ games, onJoinGame, onSpectateGame }: GameListProps) {
  const getStatusBadge = (status: Game["status"]) => {
    const variants = {
      waiting: "secondary",
      active: "default",
      completed: "outline",
    } as const

    return (
      <Badge variant={variants[status]}>
        {status === "waiting" ? "Open" : status === "active" ? "In Progress" : "Completed"}
      </Badge>
    )
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Game Lobby</h2>
        <Badge variant="outline" className="gap-1">
          <Users className="w-3 h-3" />
          {games.length} games
        </Badge>
      </div>

      {games.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No games available. Create one to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Game #{game.id.slice(-6)}</CardTitle>
                  {getStatusBadge(game.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Players</div>
                    <div className="text-muted-foreground">X: {game.players.x || "Open"}</div>
                    <div className="text-muted-foreground">O: {game.players.o || "Open"}</div>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Created
                    </div>
                    <div className="text-muted-foreground">{formatTime(game.createdAt)}</div>
                    {game.spectators && game.spectators.length > 0 && (
                      <div className="text-muted-foreground">{game.spectators.length} watching</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {game.status === "waiting" && (!game.players.x || !game.players.o) && (
                    <Button onClick={() => onJoinGame(game.id)} className="flex-1">
                      Join Game
                    </Button>
                  )}

                  {(game.status === "active" || game.status === "completed") && (
                    <Button variant="outline" onClick={() => onSpectateGame(game.id)} className="flex-1 gap-1">
                      <Eye className="w-4 h-4" />
                      Watch
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
