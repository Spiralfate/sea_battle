import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduceShipsService {

  constructor() { 
    
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
}
