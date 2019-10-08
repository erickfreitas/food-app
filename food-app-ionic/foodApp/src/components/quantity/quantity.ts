import { ProductModel } from './../../app/models/product.model';
import { ShoppingCartProvider } from './../../providers/shopping-cart/shopping-cart';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent implements OnInit {
  quantity: number = 0

  @Input() product: ProductModel
  @Output() quantityChanged = new EventEmitter()

  constructor(private shoppingCartProvider: ShoppingCartProvider) {
    
  }

  ngOnInit(): void {
    this.shoppingCartProvider.getShoppingCart().subscribe((data => {
      this.quantity = this.shoppingCartProvider.getProductQuantity(this.product)
    }))
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
