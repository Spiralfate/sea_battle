import { Coordinates } from './coordinates'
export class Action {
    constructor(
        public type: string, 
        public coordinates: Coordinates, 
        public targetTeam: number, 
        public targetPlayer: number,
        public value: string
    ) {}
}

