import { ProductModel } from './../../app/models/product.model';
import { ShoppingCartProvider } from './../../providers/shopping-cart/shopping-cart';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent implements OnInit {
  quantity: number = 0

  @Input() product: ProductModel
  @Output() quantityChanged = new EventEmitter()

  constructor(private shoppingCartProvider: ShoppingCartProvider,
              private events: Events) {
    
  }

  ngOnInit(): void {
    this.updateQuantity()
    this.registerEvent()
  }

  private registerEvent():void {
    this.events.subscribe('updateProductQuantity', () => {
      console.log('Evento chamado', this.product.name)
      this.updateQuantity()
    })
  }

  private updateQuantity():void   {
    this.quantity = this.shoppingCartProvider.getProductQuantity(this.product)
  }

  add(){
    this.quantity++
    this.quantityChanged.emit(this.quantity)
    this.shoppingCartProvider.addItem(this.product)
  }

  remove(){
    this.quantity--
    if (this.quantity < 0){
      this.quantity = 0
    }
    this.quantityChanged.emit(this.quantity)
    this.shoppingCartProvider.removeItem(this.product)
  }

}
