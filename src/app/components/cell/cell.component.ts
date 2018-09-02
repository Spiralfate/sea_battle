import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { TurnTakerService } from '../../services/turn_taker/turn-taker.service'
import { GameStateService } from '../../services/game_state/game-state.service'
import { Cell } from '../../classes/cell'

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  private style: object = {}
  private value: object = {}
  @Input() square
  @Input() revealed
  @Input() teamId
  @Input() playerId
  constructor(private _config: ConfigurationService, private _turns: TurnTakerService, private _state: GameStateService) { }

  ngOnInit() {
    let size: object = this._config.configuration.cell
    let color

    this.value = this.square.value
    let testingValue = this.revealed ? this.value.true : this.value.display

    switch(testingValue) {
      case '@': {
        color = 'black'
        break
      }
      case '_': {
        color = 'grey'
        break
      }
      case 'X': {
        color = 'pink'
        break
      }
    }


    this.style = {
      width: `${size.width}px`,
      height: `${size.height}px`,
      background: color,
      outline: '1px solid black'
    }
  }

  performAction() {
    let chosenTeam = this._config.configuration.chosenTeam
    let currentTurn = this._turns.current_turn
    if (currentTurn.team !== chosenTeam || (this.teamId === chosenTeam && type !== 'repair')) return
    this._state.performAction('fire', this.teamId, this.playerId, this.square.coordinates)
  }
}
