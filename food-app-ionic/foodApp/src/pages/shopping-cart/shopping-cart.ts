import { ShoppingCartProvider } from './../../providers/shopping-cart/shopping-cart';
import { ShoppingCartModel } from './../../app/models/shopping-cart.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductModel } from '../../app/models/product.model';

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
              private shoppingCartProvider: ShoppingCartProvider,
              public modalCtrl: ModalController) {
    
  }

  ionViewDidLoad() {
    this.shoppingCartProvider.getShoppingCart().subscribe((data => {
      this.shoppingCart = data
    }))
  }

  viewProduct(product: ProductModel) {
    let modal = this.modalCtrl.create('ProductDetailPage', { product: product})
    modal.present()
  }

}
