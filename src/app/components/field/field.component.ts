import { Component, OnInit, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { GameStateService } from '../../services/game_state/game-state.service'
import { TurnTakerService } from '../../services/turn_taker/turn-taker.service'

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() battleField
  @Input() teamId
  @Input() playerId

  private _cell = this._config.configuration.cell
  private _size: object = this._config.configuration.fieldSize
  private cells = []
  private style: object = {
    width:`${this._cell.width * this._size.width}px`
  }
  private revealed: boolean = false

  constructor(private _config: ConfigurationService, private turns: TurnTakerService) { }

  ngOnInit() {
    this.cells = this.battleField
    this.revealed = this.teamId == this._config.configuration.chosenTeam
    console.log('The field is revealed:',this.revealed)
    console.log(`This field\'s team id is ${this.teamId}, and the chosen team id is ${this._config.configuration.chosenTeam}`)
  }
  currentTurn() {
    return 
  }
}

