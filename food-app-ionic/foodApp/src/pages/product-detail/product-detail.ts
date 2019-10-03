import { AlertProvider } from './../../providers/alert/alert';
import { ProductModel } from './../../app/models/product.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product: ProductModel = new ProductModel()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertProvider : AlertProvider) {
    this.product = <ProductModel>navParams.get('product')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  back() {
    this.viewCtrl.dismiss()
  }

  addToCart(){
    this.alertProvider.toast('Produto adicionado ao carrinho', 'bottom')
    this.viewCtrl.dismiss()
  }
}
