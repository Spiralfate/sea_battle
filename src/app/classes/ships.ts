import { Ship } from './ship'

export class Ships {
    constructor( ...ships: Array<Ship>) {
        this.ships = ships
    }
}
