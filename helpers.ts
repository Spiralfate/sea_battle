
/*
    Getting the value of the specific square
    Output example: {coordinates: {x: 3, y: 0}, value: 'o'}
 */
export const checkSpot = (field, coordinates) => {
    const x = coordinates ? coordinates.x : 1 + Math.random() * field[0].length;
    const y = coordinates ? coordinates.y : 1 + Math.random() * field.length;
    const value = field.filter(el => el.coordinates.x === x && el.coordinates.y === y)[0].value
    return { coordinates: { x, y }, value }; 
}



/*
    Gets the array of coordinates of the whole ship.
    Output example:  [{x: 0, y: 3}, {x: 1, y: 3}]
*/               
export const buildShip = (prev, field, currentShip, targetSize) => {

    if (currentShip.length === targetSize) return currentShip;

    const { x, y } = prev;
    const ship = [prev];
    const surroundings = scanSurroundings(prev, field);
    if (surroundings.some(square => square.value === '#')) {
        // UNFINISHED
    }
}


/*
    Gets the array of the surrounding squares, up to 8 elements. 
    Output example: [{coordinates: {x: 5, y: 4}, value: 'o'}, {coordinates:..}]
 */
export const scanSurroundings = (target, field) => {
    const { x, y } = target;
    const surroundings = [];
    for (let xcor = x - 1; xcor < x + 1; xcor++) {
        for (let ycor = y - 1; ycor < y + 1; ycor++) {
            if (!(field[ycor] && field[ycor][xcor])) continue;
            surroundings.push(checkSpot(field, target))
        }
    }
    return surroundings;
}

/*
    Transforms the field from array of arrays into the array of objects.
    Output example: [{coordinates: {x: 0, y: 0}, value: 'o'}, {coordinates: {x:1, y: 0}...}]
 */
export const transformField = field => {
    return field.map(row => row.join('')).join('').split('').map((el, index) => {
        const x: number = index % field[0].length;
        const y: number = (index - x) / field.length;
        return { coordinates: { x, y }, value: el } 
    })
}
