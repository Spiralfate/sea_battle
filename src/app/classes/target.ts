import { Coordinates } from './coordinates'

export class Target {
    constructor(teamIndex: number, playerIndex: number, coordinates: Coordinates) {
        this.team = teamIndex
        this.player = playerIndex
        this.coordinates = coordinates
    }
}
