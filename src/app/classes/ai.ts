import { Player } from './player'
import { Ships } from './ships'

export class AI extends Player{
    consctructor(type: string, spec: string, ships: Ships, level: string) {
        super(type, spec, ships)
        this.level: string = level
    }
}
