import { Coordinates } from './coordinates'

export class Cell {
    constructor(x: number, y: number, trueValue: string, displayValue: string) {
        this.coordinates = new Coordinates(x, y)
        this.value = { true: trueValue, display: displayValue }
    }
}
