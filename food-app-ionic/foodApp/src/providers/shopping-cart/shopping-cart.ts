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
    this._shoppingCart.dateTime = new Date()

    //criando observable de carrinho
    this.shoppingCart = Observable.create(observable => {
      this.shoppingCartObservable = observable
      this.shoppingCartObservable.next(this._shoppingCart)
    })

  }

  public getShoppingCart(): Observable<ShoppingCartModel> {
    return this.shoppingCart
  }

  public addItem(product: ProductModel): void{
    this._shoppingCart.items.forEach((item) =>{
      let productExist = false;

      if (item.product._id == product._id ) {
        item.quantity++;
        productExist = true;
      }

      if (!productExist) {
        let shoppingCartItem = new ShoppingCartItemModel();
        shoppingCartItem.product = product
        shoppingCartItem.quantity = 1

        this._shoppingCart.items.push(shoppingCartItem)
      }
      
      this.shoppingCartObservable.next(this._shoppingCart)
    })
  }

  public removeItem(product: ProductModel): void{
    
  }

  // public addItem(product: ProductModel): void{
  //   let shoppingCartItem = new ShoppingCartItemModel();
  //   shoppingCartItem.product = product
  //   shoppingCartItem.quantity = 1

  //   this._shoppingCart.items.push(shoppingCartItem)

  //   this.shoppingCartObservable.next(this._shoppingCart)
  // }

}
