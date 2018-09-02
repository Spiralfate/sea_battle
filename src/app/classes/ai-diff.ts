import { ConfigurationService } from '../services/configuration/configuration.service'
import { GameStateService } from '../services/game_state/game-state.service'
import { ActionsHistoryService } from '../services/actions_history/actions-history.service'
import { Coordinates } from './coordinates'
import { Target } from './target'

export class AiDiff {

    constructor(
        private _config: ConfigurationService,
        private _state: GameStateService,
        private _history: ActionsHistoryService

    ) {
        this.useDiff = {}
        this.difficulties.forEach((diff, index) => {
            this.useDiff[diff] = this[`level${index + 1}`]
        })
    }
    difficulties: Array<string> = this._config.configuration.difficultyLevels



    level1 (teamIndex) {
        let  {targetTeamIndex, targetPlayerIndex, filteredPlayer } = this.choseRandomEnemy(teamIndex)

        let targetCell = filteredPlayer[this.getRandomIndex(filteredPlayer)]
        let coordinates = new Coordinates(targetCell.coordinates.x, targetCell.coordinates.x.y)
        return new Target(targetTeamIndex, targetPlayerIndex, coordinates)
    }

    level2(teamIndex) {
        let enemies = this.enemies(teamIndex)
        let teams = this._state.teams
        let historyOfSuccessfulShots = this.successfulShots(teamIndex)

        if (historyOfSuccessfulShots.length === 0) return this.level1(teamIndex)

        let nextTarget: Target
        while (historyOfSuccessfulShots.length > 0) {
            let { targetTeam, targetPlayer, coordinates } = historyOfSuccessfulShots[0]
            let nextCoors = this.choseNearbyCell(coordinates, teams[targetTeam].players[targetPlayer])
            if (!nextCoors) historyOfSuccessfulShots.pop()
            else { 
                historyOfSuccessfulShots = []
                nextTarget = new Target(targetTeam, targetPlayer, new Coordinates(nextCoors.coordinates.x, nextCoors.coordinates.y))
            }
        }
        return nextTarget ? nextTarget : this.level1(teamIndex)
    }

    level3(teamIndex) {
        // let history = this.successfulShots(teamIndex)
        // if (history.length > 0) return this.level2(teamIndex)

        // let  {targetTeamIndex, targetPlayerIndex, filteredPlayer } = this.choseRandomEnemy(teamIndex)
        return this.level2(teamIndex)

    }

    enemies(teamIndex) {
        let teams = this._config.configuration.teams
        let indexes = teams.map((team, ind) => ind)
        return indexes.filter(index => index !== teamIndex)
    }

    successfulShots(selfTeam) {
        return this._history.getHistory()
        .filter(action => action.targetTeam !== selfTeam)
        .filter(action => action.type === 'fire' && action.value === '@')
    }

    choseNearbyCell(coordinates, field) {
        let teams = this._state.teams
        let directions = {x: ['+ 1', '- 1'], y: ['+ 1', '- 1']}
        let surroindings = []
        for (let axis in directions) {
            for (let dir of axis) {
                let targetCoors = new Coordinates(eval(`${coordinates.x}${axis === 'x' ? dir : ''}`), eval(`${coordinates.y}${axis === 'y' ? dir : ''}`))
                let targetCell = field.find(cell => cell.coordinates.x === targetCoors.x && cell.coordinates.y === targetCoors.y)
                surroindings.push(targetCell)
            }
        }
        return surroindings.filter(side => side !== undefined).find(side => side.value.display === '_')
    }

    getRandomIndex(array) {
        return Math.ceil(Math.random() * (array.length - 1))
    }

    choseRandomEnemy(selfTeam) {
        let enemies = this.enemies(teamIndex)
        let teams = this._state.teams

        let targetTeamIndex = enemies[this.getRandomIndex(enemies)]
        let targetTeam = teams[targetTeamIndex]
        
        let targetPlayerIndex = this.getRandomIndex(targetTeam.players)
        let targetPlayer = targetTeam.players[targetPlayerIndex]
        let filteredPlayer = targetPlayer.filter(cell => cell.value.display === '_')
        return {targetTeamIndex, targetPlayerIndex, filteredPlayer }
    }
}
