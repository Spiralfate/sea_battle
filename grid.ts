import { Shifting } from './grid_shifting';


/*
    This class builds the basic array of arrays, representing
    the grid row by row
 */
export class Grid extends Shifting{
    constructor (scale, grid) {
        super();
        const newGrid = grid ? grid : new Array(scale.y).fill(new Array(scale.x).fill('o'));

        this.fields = {
            player: newGrid,
            AI: newGrid
        }
    }
    // action_types: 'remove', 'add', 'destroy'
    performAction (action_type, coordinates, field_owner) {     
        const { x, y }  = coordinates;
        this[field_owner][y][x] = this[action_type]
    }
}