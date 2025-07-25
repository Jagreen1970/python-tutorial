"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlayerSetupProps {
  onSetPlayer: (name: string) => void
}

export function PlayerSetup({ onSetPlayer }: PlayerSetupProps) {
  const [playerName, setPlayerName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim()) {
      onSetPlayer(playerName.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Tic-Tac-Toe</CardTitle>
          <p className="text-muted-foreground">Enter your name to start playing</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              required
            />
            <Button type="submit" className="w-full" disabled={!playerName.trim()}>
              Enter Game Lobby
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
