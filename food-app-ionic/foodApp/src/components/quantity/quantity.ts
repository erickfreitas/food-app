import { Component } from '@angular/core';

@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent {
  quantity: number = 0
  text: string;

  constructor() {
    console.log('Hello QuantityComponent Component');
    this.text = 'Hello World';
  }

  add(){
    this.quantity++
  }

  remove(){
    this.quantity--
  }

}
