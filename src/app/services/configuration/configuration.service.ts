import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }
  public configuration: any = {
    cell: <object> {
      width: '30',
      height: '30'
    },
    fieldSize: <object>{
      width: '10',
      height: '10'
    },
    teams: [],
    difficultyLevels: [
      'starter',
      'intermediate',
      'veteran'
    ],
    specializations: [
      'tinkerer',
      'berserker',
      'scout',
      'tactician'
    ],
    defaultShips: [
      {size: '4', number: '1'},
      {size: '3', number: '2'},
      {size: '2', number: '3'},
      {size: '1', number: '4'}
    ]
  }
  setConfiguration(option) {
    this.configuration = Object.assign(this.configuration, option)
  }
}  
