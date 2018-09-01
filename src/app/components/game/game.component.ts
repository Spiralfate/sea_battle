import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { FieldComponent } from '../field/field.component'
import { GameStateService } from '../../services/game_state/game-state.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  teams = []

  constructor(private _config: ConfigurationService, private _state: GameStateService) { }

  ngOnInit() {
    console.log('POPULATING FIELDS!')
    this.teams = this._state.populateFields()
  }
  clean() {
    this._state.cleanFields()
  }
}
