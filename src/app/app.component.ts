import { Component } from '@angular/core';
import { ConfigurationService } from './services/configuration/configuration.service'

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sea-battle';
  constructor(private _config: ConfigurationService) { }

}
