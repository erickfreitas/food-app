import { ShoppingCartProvider } from './../../providers/shopping-cart/shopping-cart';
import { ShoppingCartModel } from './../../app/models/shopping-cart.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  products: any
  totalProducts = 0
  shoppingCart: ShoppingCartModel = new ShoppingCartModel()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private shoppingCartProvider: ShoppingCartProvider) {
    shoppingCartProvider.getShoppingCart().subscribe((data => {
      this.shoppingCart = data
    }))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

}
