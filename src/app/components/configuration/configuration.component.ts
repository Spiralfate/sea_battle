import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { FormsModule } from '@angular/forms';
import { Player } from '../../classes/player';
import { AI } from '../../classes/ai';

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(private _config: ConfigurationService) { }

  fieldOptions = []

  teamsOptions = this._config.configuration.teams
  diffLevels = this._config.configuration.difficultyLevels
  specializations = this._config.configuration.specializations.concat('none')

  ngOnInit() {
    const deepSearchFieldOptions = (obj, upperName?: string) => {
      let prefix = upperName ? `${upperName}_` : ''
      for (let option in obj) {
        if (option === 'teams') {
          continue;
        }
        typeof obj[option] == 'object' ? deepSearchFieldOptions(obj[option], option) : this.fieldOptions.push({name: `${prefix}${option}`, value: obj[option]})
      }
    }



    deepSearchFieldOptions(this._config.configuration)
  }

  check(type, value) {
    return type === value
  }

  changePlayerType(event, teamIndex, playerIndex) {
    let { value } = event.target
    this.teamsOptions[teamIndex].players[playerIndex].player_type = value
  }

  setNewValue(option) {
    let { name } = option
    let parent = name.match('_') ? name.slice(0, name.indexOf('_')) : null;
    if (parent) {
      let child = name.slice(name.indexOf('_') + 1)
      let updatedOption = Object.assign(this._config.configuration[parent], { [child]: option.value })
      this._config.setConfiguration({[parent]: updatedOption})
    } else {
      this._config.setConfiguration({ [option.name]: option.value })
    }
  }

  addTeam() {
    this._config.configuration.teams.push({players: []})
  }
  deleteTeam(index) {
    this._config.configuration.teams = this._config.configuration.teams.filter((t, i) => i !== index)
  }

  addPlayer(teamIndex) {
    let player_type = Math.random() > 0.5 ? 'human' : 'AI'
    let parameters = [
      player_type,
      'none',
      [...this._config.configuration.defaultShips]
    ]
    player_type === 'AI' ? parameters.push('starter') : ''
    //this._config.configuration.teams[teamIndex].players.push({
    //  player_type, 
      //specialization: 'none', 
      //level: 'starter', 
      //ships: [...this._config.configuration.defaultShips]
    //})
    let playrToAdd: Player = player_type === 'AI' ? new AI(...parameters) : new Player(...parameters)
    this._config.configuration.teams[teamIndex].players.push(playrToAdd)
  }
  deletePlayer(teamIndex, playerIndex) { 
    this._config.configuration.teams[teamIndex].players = this._config.configuration.teams[teamIndex].players.filter((pl, i) => i !== playerIndex) 
  }
  checkIfTeamChosen(teamId) {
    return this._config.configuration.chosenTeam === teamId
  }
  choseTeam(teamId) {
    this._config.configuration.chosenTeam = teamId
  }
}
