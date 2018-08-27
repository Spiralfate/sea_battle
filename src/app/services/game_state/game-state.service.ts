import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  public state = {
    current_turn: { team: '', player: '' },
    teamsFields: []
  }
  

  constructor(private _config: ConfigurationService) { }

  populateFields() {
    let { teams, fieldSize } = this._config.configuration
    let { width, height } = fieldSize
    teams.forEach((team, tIndex) => {
      let { players } = team
      let newTeam = {players: []}
      players.forEach((player, pIndex) => {
        let newPlayer = []
        for (let i = 0; i < width * height; i++) {
          let x = i % width
          let y = Math.floor(i / height)
          newPlayer.push({coordinates: {x, y}, value: '_'})
        }
        this.placeShips(newPlayer, player.ships)
        newTeam.players.push(newPlayer)
      })
      this.state.teamsFields.push(newTeam)
    })
  }

  placeShips(emptyField, ships) {
    let newField = emptyField

    ships.sort((a, b) => {
      return b.size - a.size
    }).forEach((ship, shupIndex) => {
      let { number, size } = ship
      for (let i = 0; i < number; i++) {
        let forms = this.getShipForms(size)
        let randomIndex = Math.round(Math.random() * (forms.length - 1))
        let chosenForm = forms[randomIndex]
        newField = this.placeShip(chosenForm, newField)
      }
    })
  }

  placeShip(shipCoors, field, attempt = 1) {
    let randomSpot = Math.floor(Math.random() * (field.length))
    let testingField = field
    let { x, y } = testingField[randomSpot].coordinates
    testingField[randomSpot].value = 'T'
    shipCoors.slice(1).forEach((cell, i) => {
      let locatedCell = testingField.find((coor) => {
        return coor.coordinates.x == cell.coordinates.x + x && coor.coordinates.y == cell.coordinates.y + y
      })
      if (!locatedCell || locatedCell.value == '@') {
        return this.placeShip(shipCoors, field.map((cell, i) => i === randomSpot ? Object.assign(cell, {value: 'O'}) : cell), attempt++)
      }
      if (this.checkSurroundings(testingField, locatedCell.coordinates, 'T')) {
        locatedCell.value = 'T'
      } else {
        return this.placeShip(shipCoors, field.map((cell, i) => i === randomSpot ? Object.assign(cell, {value: 'O'}) : cell), attempt++)
      }
    })
    return testingField.map(el => el.value === 'T' ? Object.assign(el, {value: '@'}) : el ).map(el => el.value === 'O' ? Object.assign(el, {value: '_'}) : el )
  }

  checkSurroundings(field, coordinate, allowedSymbol) {
    let { x, y } = coordinate
    for (let yCoor = -1; yCoor < 2; yCoor++) {
      for (let xCoor = -1; xCoor < 2; xCoor++) {
        let testingCell = field.find(cell => {
          return cell.coordinates.x === x + xCoor && cell.coordinates.y === y + yCoor
        })
        if (!testingCell) continue
        if (testingCell.value !== allowedSymbol && testingCell.value !== '_' && testingCell.value !== 'O') {
          return false
        }
      }
    }
    return true
  }

  getShipForms(sizeToFill, currentArray = []) {
    let currentSize = sizeToFill
    let current
    if (currentArray.length === 0) {
      current = [[{ coordinates: {x: 0, y: 0}, value: '@' }]]      
      if (--currentSize === 0) return current
    } else {
      current = currentArray
    }
    let nextArray = []
    current.forEach(form => {
      let newForms = []
      this.getFreeFormSurroundings(form).forEach(coors => {
        newForms.push(form.concat({coordinates: coors, value: '@'}))
      })
      nextArray = nextArray.concat(newForms)
    })        
    if (--currentSize === 0) {
      return nextArray
    } else {
      return this.getShipForms(currentSize, nextArray)
    }
  }

  getFreeFormSurroundings(shipFormArray) {
    let freeCoors = []
    shipFormArray.forEach(cell => {
      let { x, y } = cell.coordinates
      if (!shipFormArray.some(cell => cell.coordinates.x === x + 1 
          && cell.coordinates.y === y) 
          && !freeCoors.includes({x: x + 1, y})) freeCoors.push({x: x + 1, y})

      if (!shipFormArray.some(cell => cell.coordinates.x === x - 1 
          && cell.coordinates.y === y) 
          && !freeCoors.includes({x: x - 1, y})) freeCoors.push({x: x - 1, y})

      if (!shipFormArray.some(cell => cell.coordinates.x === x 
          && cell.coordinates.y === y + 1) 
          && !freeCoors.includes({x, y: y + 1})) freeCoors.push({x, y: y + 1})

      if (!shipFormArray.some(cell => cell.coordinates.x === x 
          && cell.coordinates.y === y - 1) 
          && !freeCoors.includes({x, y: y - 1})) freeCoors.push({x, y: y - 1})
    })
    return freeCoors
  }

  cleanFields() {
    this.state.teamsFields = []
  }
}
