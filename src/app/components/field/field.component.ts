import { Component, OnInit, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { ConfigurationService } from '../../services/configuration/configuration.service'
import { GameStateService } from '../../services/game_state/game-state.service'

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() battleField

  private _cell = this._config.configuration.cell
  private _size: object = this._config.configuration.fieldSize
  private cells = []
  private style: object = {
    width:`${this._cell.width * this._size.width}px`
  }

  constructor(private _config: ConfigurationService) { }

  ngOnInit() {
    this.cells = this.battleField
  }
}
