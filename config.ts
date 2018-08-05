/*
    Game configuration:
        - turning off and on the autofill option to set ships 
        either automaticaly or manually at the beginning of the game
        - adjustable ships parameters
        - grid parameters
 */
export const config = () => {
    return {
        autofill: true,
        ships: [
            { size: 4, number: 1 },
            { size: 3, number: 2 },
            {size: 2, number: 3 },
            {size: 1, number: 4 }
        ],
        grid: {
            cols: 10,
            rows: 10
        }
    }
}