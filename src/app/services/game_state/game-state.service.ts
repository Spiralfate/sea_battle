import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { ProduceShipsService } from '../../services/produce_ships/produce-ships.service'
// import { TurnTakerService } from '../../services/turn_taker/turn-taker.service'
import { CellComponent } from '../../components/cell/cell.component';
import { Coordinates } from '../../classes/coordinates'
import { ActionType } from '../../classes/action-type'
import { Action } from 'rxjs/internal/scheduler/Action';
import { Cell } from '../../classes/cell'

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(
    private _config: ConfigurationService, 
    private _shipForms: ProduceShipsService
    // private turns: TurnTakerService
  ) { }

  teams = []

  populateFields() {
    let { teams, fieldSize } = this._config.configuration
    let { width, height } = fieldSize
    let teamFields: Array<object> = []
    teams.forEach((team, tIndex) => {
      let { players } = team
      let newTeam = {players: []}
      players.forEach((player, pIndex) => {
        let newPlayer = []
        for (let i = 0; i < width * height; i++) {
          let x = i % width
          let y = Math.floor(i / height)
          newPlayer.push(new Cell(x, y, '_', '_'))
          // newPlayer.push({coordinates: new Coordinates(x, y), value: '_'})
        }
        let filledPlayerField = this.placeShips(newPlayer, player.ships)
        newTeam.players.push(filledPlayerField)
      })
      teamFields.push(newTeam)
    })
    this.teams = teamFields
  }

  placeShips(emptyField, ships) {
    let newField = emptyField

    console.log(`Placing ${ships.length} ships:`, ships)
    ships.sort((a, b) => {
      return b.size - a.size
    }).filter(ship => Number(ship.number) !== 0)
    .forEach((ship, shipIndex) => {
      let { number, size } = ship
      for (let i = 0; i < Number(number); i++) {
        let forms = this._shipForms.getShipForms(size)
        let randomIndex = Math.round(Math.random() * (forms.length - 1))
        let chosenForm = forms[randomIndex]
        newField = this.placeShip(chosenForm, newField)
      }
    })
    return newField
  }

  placeShip(shipCoors, initialField, currentField = initialField) {
    if (currentField.length === 0) return initialField
    // console.log('Placing ship: ')
    // console.log(shipCoors.map(cell => cell.coordinates))
    let randomSpot = Math.floor(Math.random() * (currentField.length))
    let { x, y } = currentField[randomSpot].coordinates
    let testingCell = initialField.find(cell => cell.coordinates.x === x && cell.coordinates.y === y)
    // console.log(`The initial cell is: x: ${x}, y: ${y}`)  
    if (!this.checkSurroundings(initialField, { x, y }, '')) {
      // console.log('The INITIAL cell we found is close to an obstacle')
      return this.placeShip(shipCoors, initialField, initialField.filter((cell, i) => cell.coordinates.x === x && cell.coordinates.y === y ? false : true))
    }
    testingCell.value.true = 'T' 
      // testingField[randomSpot].value = 'T'
    let slicedForm = shipCoors.slice(1)
    // console.log(`Building ship ${slicedForm.length + 1} cell long`)
    // console.log(shipCoors, slicedForm)
    for (let i = 0; i < slicedForm.length; i++) {
      let locatedCell = initialField.find((coor) => {
        return coor.coordinates.x == slicedForm[i].coordinates.x + x && coor.coordinates.y == slicedForm[i].coordinates.y + y
      })
      // console.log(`Found field cell for x: ${slicedForm[i].coordinates.x + x}, y: ${slicedForm[i].coordinates.y + y}, which is ${locatedCell ? locatedCell.value : "absent"}`)
      if (!locatedCell || locatedCell.value.true === '@') {
        // console.log('Looks like the cell we found is not there or is already occupied')
        let clearedInitialField =  initialField.map((cell, i) => { 
          let updatedCell = (cell.value.true === 'T') ? Object.assign({}, cell, {value: Object.assign(cell.value, {true: '_'})}) : cell
          return updatedCell
        })
        let filteredCurrentField = currentField.filter((cell, i) => i === randomSpot ? false : true)
        return this.placeShip(shipCoors, clearedInitialField, filteredCurrentField)
      }
      if (this.checkSurroundings(initialField, locatedCell.coordinates, 'T')) {
        // console.log('The cell we found is not close to any obstacle')
        locatedCell.value.true = 'T'
      } else {
        // console.log('The cell we found have forbidden surroundings')
        let clearedInitialField =  initialField.map((cell, i) => cell.value.true === 'T' ? Object.assign({}, cell, {value: Object.assign(cell.value, {true: '_'})}) : cell)
        let filteredCurrentField = currentField.filter((cell, i) => i === randomSpot ? false : true)
        return this.placeShip(shipCoors, clearedInitialField, filteredCurrentField)
      }
    }
    let filteredFinal =  initialField.map(el => el.value.true === 'T' ? Object.assign({}, el, {value: Object.assign(el.value, {true: '@'})}) : el )
    // console.log('Ships coors: ', shipsArray, 'Filtered final: ', filteredFinal)
    return filteredFinal
  }

  checkSurroundings(field, coordinate, allowedSymbol) {
    let { x, y } = coordinate
    for (let yCoor = -1; yCoor < 2; yCoor++) {
      for (let xCoor = -1; xCoor < 2; xCoor++) {
        let testingCell = field.find(cell => {
          return cell.coordinates.x === x + xCoor && cell.coordinates.y === y + yCoor
        })
        if (!testingCell) continue
        if (testingCell.value.true !== allowedSymbol && testingCell.value.true !== '_') {
          return false
        }
      }
    }
    return true
  }

  performAction(type, teamId, playerId, coordinates) {
    let action = new ActionType()
    let field = this.teams[teamId].players[playerId]
    field = action[type](field, coordinates)
  }

  cleanFields() {
    // this.state.teamsFields = []
  }
  checkState() {
    let teams = this.teams
    let teamsState = teams.map(team => team.players.reduce((acc, cur) => {
      let playerShipCellsSum =  cur.reduce((shipsSum, curCell) => { 
        return curCell.value.true == '@' ? ++shipsSum : shipsSum
       }, 0) 
       return acc + playerShipCellsSum
    }, 0))
    let teamsAlive = 0
    teamsState.forEach(teamCount => {
      teamCount > 0 ? teamsAlive ++ : ''
    })
    if (teamsAlive < 2) {
      this.theEnd()
    }
    return teamsAlive < 2
  }
  theEnd() {
    this.teams = []
  }
}
