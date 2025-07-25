"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, RefreshCw } from "lucide-react"
import { GameAPI } from "./services/api"
import type { Game, GameMove } from "./types/game"
import { GameList } from "./components/game-list"
import { GameBoard } from "./components/game-board"
import { PlayerSetup } from "./components/player-setup"
import { useToast } from "@/hooks/use-toast"

type ViewState = "setup" | "lobby" | "game"

export default function TicTacToeApp() {
  const [playerName, setPlayerName] = useState<string>("")
  const [currentView, setCurrentView] = useState<ViewState>("setup")
  const [games, setGames] = useState<Game[]>([])
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [isSpectating, setIsSpectating] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Poll for game updates when viewing a specific game
  useEffect(() => {
    if (currentView === "game" && currentGame) {
      const interval = setInterval(async () => {
        try {
          const updatedGame = await GameAPI.getGame(currentGame.id)
          setCurrentGame(updatedGame)
        } catch (error) {
          console.error("Failed to update game:", error)
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [currentView, currentGame])

  // Poll for games list when in lobby
  useEffect(() => {
    if (currentView === "lobby") {
      loadGames()
      const interval = setInterval(loadGames, 5000)
      return () => clearInterval(interval)
    }
  }, [currentView])

  const loadGames = async () => {
    try {
      const gamesList = await GameAPI.getGames()
      setGames(gamesList)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load games",
        variant: "destructive",
      })
    }
  }

  const handleSetPlayer = (name: string) => {
    setPlayerName(name)
    setCurrentView("lobby")
  }

  const handleCreateGame = async () => {
    setLoading(true)
    try {
      const newGame = await GameAPI.createGame({ playerName })
      setCurrentGame(newGame)
      setIsSpectating(false)
      setCurrentView("game")
      toast({
        title: "Game Created",
        description: "Waiting for another player to join...",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create game",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGame = async (gameId: string) => {
    setLoading(true)
    try {
      const game = await GameAPI.joinGame(gameId, { playerName })
      setCurrentGame(game)
      setIsSpectating(false)
      setCurrentView("game")
      toast({
        title: "Joined Game",
        description: "Game is starting!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join game",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSpectateGame = async (gameId: string) => {
    setLoading(true)
    try {
      const game = await GameAPI.spectateGame(gameId, playerName)
      setCurrentGame(game)
      setIsSpectating(true)
      setCurrentView("game")
      toast({
        title: "Spectating Game",
        description: "You are now watching this game",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to spectate game",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleMove = async (move: GameMove) => {
    if (!currentGame) return

    try {
      const updatedGame = await GameAPI.makeMove(currentGame.id, move)
      setCurrentGame(updatedGame)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to make move",
        variant: "destructive",
      })
    }
  }

  const handleBackToLobby = () => {
    setCurrentGame(null)
    setIsSpectating(false)
    setCurrentView("lobby")
  }

  if (currentView === "setup") {
    return <PlayerSetup onSetPlayer={handleSetPlayer} />
  }

  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-2xl font-bold">Tic-Tac-Toe Arena</h1>
              <p className="text-muted-foreground">Welcome, {playerName}!</p>
            </div>
            {currentView === "game" && (
              <Button variant="outline" onClick={handleBackToLobby} className="gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back to Lobby
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        {currentView === "lobby" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GameList games={games} onJoinGame={handleJoinGame} onSpectateGame={handleSpectateGame} />
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <Button onClick={handleCreateGame} disabled={loading} className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Game
                  </Button>
                  <Button variant="outline" onClick={loadGames} className="w-full gap-2 bg-transparent">
                    <RefreshCw className="w-4 h-4" />
                    Refresh Games
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === "game" && currentGame && (
          <div className="flex justify-center">
            <GameBoard game={currentGame} playerName={playerName} onMove={handleMove} isSpectating={isSpectating} />
          </div>
        )}
      </div>
    </div>
  )
}
