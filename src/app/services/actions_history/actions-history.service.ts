import { Injectable } from '@angular/core';
import { Action } from '../../classes/action'

@Injectable({
  providedIn: 'root'
})
export class ActionsHistoryService {

  constructor() { }
  private history = []

  addAction(action: Action) {
    this.history.push(action)
  }
  getHistory() {
    return this.history
  }
}
