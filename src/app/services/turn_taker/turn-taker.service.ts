import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { GameStateService } from '../../services/game_state/game-state.service'
import { AiDiff } from '../../classes/ai-diff'

@Injectable({
  providedIn: 'root'
})
export class TurnTakerService {

  playersQueue = []
  current_turn: object = {team: null, player: null}
  queueIndex = 0

  constructor(
    private _config: ConfigurationService,
    private _state: GameStateService,
  ) { }

  formQueue() {
    let queue = []
    let { teams } = this._config.configuration
    teams.forEach((team, teamIndex) => {
      team.players.forEach((player, playerIndex) => {
        queue.push({team: teamIndex, player: playerIndex})
      })
    })
    this.playersQueue = this.shuffleArray(queue)
  }
  shuffleArray(arr) {
    return arr.sort((a, b) => {
      return Math.random() > 0.5 ? -1 : 1
    })
  }
  setTurn(queueIndex = 0) {
    debugger
    if (this._state.checkState()) return
    this.current_turn = this.playersQueue[queueIndex]
    let { team, player } = this.current_turn
    let currentPlayer = this._state.teams[team].players[player]
    let currentPlayerShips = currentPlayer.reduce((acc, cur) => {return cur.value.true === '@' ? ++acc : acc }, 0)
    if (currentPlayerShips === 0) return this.setTurn(++this.queueIndex)
    let { player_type } = this._config.configuration.teams[team].players[player]
    if (player_type === 'AI') return this.aiTurn(currentPlayer, team)
  }
// 
  aiTurn(currentPlayer, selfTeam) {
    let playerDiff = currentPlayer.level
    let diffFunction = new AiDiff().useDiff[playerDiff]
    setTimeout(() => {
      let { team, player, coordinates } = diffFunction(selfTeam)
      this._state.performAction('fire', team, player, coordinates)
      this.setTurn(++this.queueIndex)
    }, 1000 * 3)
  }
}
