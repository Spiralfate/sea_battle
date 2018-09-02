import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConfigurationService } from './services/configuration/configuration.service'
import { ProduceShipsService } from './services/produce_ships/produce-ships.service'
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { FieldComponent } from './components/field/field.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { GameComponent } from './components/game/game.component';

const appRoutes: Routes =[
  { path: '', component: GameComponent},
  { path: 'configs', component: ConfigurationComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    FieldComponent,
    ConfigurationComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ConfigurationService, ProduceShipsService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
