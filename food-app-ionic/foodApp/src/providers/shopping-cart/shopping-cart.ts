import { ProductModel } from './../../app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartModel } from '../../app/models/shopping-cart.model';
import { ShoppingCartItemModel } from '../../app/models/shopping-cart-item.model';

@Injectable()
export class ShoppingCartProvider {

  private _shoppingCart: ShoppingCartModel = new ShoppingCartModel()
  private shoppingCart: Observable<ShoppingCartModel>
  private shoppingCartObservable: any

  constructor(public http: HttpClient) {
    this.shoppingCart = Observable.create(observable => {
      this.shoppingCartObservable = observable
    })
  }

  getShoppingCart(): Observable<ShoppingCartModel> {
    return this.shoppingCart
  }

  addItem(product: ProductModel): void{
    let shoppingCartItem = new ShoppingCartItemModel();
    shoppingCartItem.product = product
    shoppingCartItem.quantity = 1

    this._shoppingCart.items.push(shoppingCartItem)

    this.shoppingCartObservable.next(this._shoppingCart)
  }

}
