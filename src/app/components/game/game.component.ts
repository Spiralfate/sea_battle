import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { FieldComponent } from './components/field/field.component'
import { GameStateService } from '../../services/game_state/game-state.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  teams = this._state.state.teamsFields

  constructor(private _config: ConfigurationService, private _state: GameStateService) { }

  ngOnInit() {
    this.populate()
  }

  populate() {
    this._state.populateFields()
  }
  clean() {
    this._state.cleanFields()
  }
}
