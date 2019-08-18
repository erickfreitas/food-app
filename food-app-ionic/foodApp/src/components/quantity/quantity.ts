import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent {
  quantity: number = 0

  @Output() quantityChanged = new EventEmitter()

  constructor() {
    console.log('Hello QuantityComponent Component');
  }

  add(){
    this.quantity++
    this.quantityChanged.emit(this.quantity)
  }

  remove(){
    this.quantity--
    if (this.quantity < 1){
      this.quantity = 1
    }
    this.quantityChanged.emit(this.quantity)
  }

}
