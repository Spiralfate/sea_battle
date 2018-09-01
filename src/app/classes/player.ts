import { Ships } from './ships'

export class Player {

    constructor(type: string, spec: string, ships: Array<Ships>) {
        this.player_type = type
        this.specialization = spec
        this.ships = ships
    }
}