import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service'

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  private style: object = {}
  @Input() square
  constructor(private _config: ConfigurationService) { }

  ngOnInit() {
    let size: object = this._config.configuration.cell
    let color
    switch(this.square.value) {
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

}
