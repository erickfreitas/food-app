import { Component, Output, EventEmitter } from '@angular/core';
import { ShoppingCartModel } from '../../app/models/shopping-cart.model';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart';

@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent {
  quantity: number = 0
  shoppingCart: ShoppingCartModel = new ShoppingCartModel()

  @Output() quantityChanged = new EventEmitter()

  constructor(private shoppingCartProvider: ShoppingCartProvider) {
    this.shoppingCartProvider.getShoppingCart().subscribe(data => {
      this.shoppingCart = data
      console.log(this.shoppingCart)
    })
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
