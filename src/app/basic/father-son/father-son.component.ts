import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-father-son',
  templateUrl: './father-son.component.html',
  styleUrls: ['./father-son.component.scss'],
})
export class FatherSonComponent {
  @Input() client?: Client;
  @Output() onDeleteClient = new EventEmitter();
  @Output() onUpdateClient = new EventEmitter<Client>();

  onDelete() {
    this.client = undefined;
    this.onDeleteClient.emit();
  }
  onChange(id: number) {
    if (!this.client) return;

    // this.client.id = newId no usar

    this.client = {...this.client,id};

    this.onUpdateClient.emit(this.client);
  }
}
