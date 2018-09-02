export class ActionType {
    constructor() {}
    fire(field, coordinates) {
        let { x, y } = coordinates
        let markedCell = field.find(cell => cell.coordinates.x === x && cell.coordinates.y === y)
        // markedCell.value.true = markedCell.value.true === '@' ? 'X' : 'O'
        if (markedCell.value.true === '@') {
            markedCell.value.true = 'X'
            markedCell.value.display = 'X'
        }
        return field
    }

    repair(field, coordinates) {
        let { x, y } = coordinates
        let markedCell = field.find(cell => cell.coordinates.x === x && cell.coordinates.y === y)
        // markedCell.value.true = markedCell.value.true === 'X' ? '@' : markedCell.value.true
        if (markedCell.value.true === 'X') {
            markedCell.value.true = '@'
            markedCell.value.display = 'X'
        } 
        return field
    }

    reveal(field, coordinates) {
        let { x, y } = coordinates
        let markedCell = field.find(cell => cell.coordinates.x === x && cell.coordinates.y === y)
        markedCell.value.display = markedCell.value.true
        return field
    }
}
