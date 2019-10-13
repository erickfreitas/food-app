import { ConfigHelper } from './../../app/helpers/config-helper';
import { HttpResultModel } from './../../app/models/http-result.model';
import { HttpProvider } from './../http/http';
import { ProductModel } from './../../app/models/product.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartModel } from '../../app/models/shopping-cart.model';
import { ShoppingCartItemModel } from '../../app/models/shopping-cart-item.model';
import { Events } from 'ionic-angular';

@Injectable()
export class ShoppingCartProvider {

  private _shoppingCart: ShoppingCartModel = new ShoppingCartModel()
  private shoppingCart: Observable<ShoppingCartModel>
  private shoppingCartObservable: any

  constructor(public http: HttpProvider,
              public events: Events) {
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

  public getProductQuantity(product: ProductModel): number {
    let item = this._shoppingCart.items.filter(x => x.product._id == product._id)[0];
    if (item)
      return item.quantity;
    else
      return 0;
  }

  public addItem(product: ProductModel): void{
    let productExist = false;

    this._shoppingCart.items.forEach((item) =>{

      if (item.product._id == product._id ) {
        item.quantity++;
        productExist = true;
      }      
    })

    if (!productExist) {
      let shoppingCartItem = new ShoppingCartItemModel();
      shoppingCartItem.product = product
      shoppingCartItem.quantity = 1

      this._shoppingCart.items.push(shoppingCartItem)
    }
    //publicando evento de atualiação para o componente de quantity
    this.events.publish('updateProductQuantity')
    this.shoppingCartObservable.next(this._shoppingCart)
  }

  public removeItem(product: ProductModel): void{
    for( var i = 0; i < this._shoppingCart.items.length; i++){ 
      if ( this._shoppingCart.items[i].product._id === product._id) {
        if (this._shoppingCart.items[i].quantity > 1) {
          this._shoppingCart.items[i].quantity--
        }
        else{
          this._shoppingCart.items.splice(i, 1); 
        }
      }
    }
    //publicando evento de atualiação para o componente de quantity
    this.events.publish('updateProductQuantity')
    this.shoppingCartObservable.next(this._shoppingCart)
  }

  public saveOrder(shoppingCart: ShoppingCartModel): Promise<HttpResultModel> {
    let order: any = {} 
    order.totalValue = shoppingCart.getTotalValue()
    order.items = []

    shoppingCart.items.forEach(item => {
      order.items.push({
        quantity: item.quantity,
        productId: item.product._id
      })
    });

    order.items = JSON.stringify(order.items)

    return this.http.post(`${ConfigHelper.url}/orders`, order)
  }

  public getOrders(): Promise<HttpResultModel> {
    return this.http.get(`${ConfigHelper.url}/orders`)
  }
}
