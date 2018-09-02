import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { FieldComponent } from '../field/field.component'
import { GameStateService } from '../../services/game_state/game-state.service'
import { TurnTakerService } from '../../services/turn_taker/turn-taker.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  teams = []
  ready: boolean = false

  constructor(
    private _config: ConfigurationService, 
    private _state: GameStateService,
    private _turns: TurnTakerService
  ) { }

  ngOnInit() {
    console.log('POPULATING FIELDS!')
    this._state.populateFields()
    this.teams = this._state.teams
    this.ready = this.readyToStart()
  }
  clean() {
    this._state.cleanFields()
  }
  readyToStart() {
    return this.teams.length > 1 && (this.teams[0].players.length > 0 && this.teams[1].players.length > 0)
  }
  start() {
    this._turns.formQueue()
    this._turns.setTurn()
  }
}
