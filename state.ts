import { Grid } from './grid';
import { config } from './config';
import { checkSpot, buildShip, transformField } from './helpers';

const { ships, autofill } = config;

/*
    The game's main state, representing the current fields occupation and the methods to
    alter it, also will have the method to check the winner
 */
class State extends Grid{
    constructor (scale, grid) {
        super(...arguments);
    }

    /*
        Initializes the ships starting position, adding them to the current state object
     */
    startingGrid () {
        if (autofill) {
            for (owner in this.fields) {
                for (ship of ships) {
                    for (number of ship.number) {
                        let intermediateField = transformField(this.fields[owner])
                        let point = {};

                        while (point.value !== '#') {
                            point = checkSpot(intermediateField)
                        }

                        let newShip = buildShip(point, intermediateField, [], ship.size);
                        this.addShip(newShip, owner);
                    }
                }
            }
        }
    }

    /*
        Overwrites the specified field with the new ship within it
    */
    addShip (ship, owner) {
        let newField = this.fields[owner];
        ship.forEach(square => {
            const { x, y } = square;
            newField[y][x] = '#';
        })
        this.fields[owner] = newField;
    }
}