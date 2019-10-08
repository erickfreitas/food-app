import { ShoppingCartModel } from './../../app/models/shopping-cart.model';
import { ShoppingCartProvider } from './../../providers/shopping-cart/shopping-cart';
import { ProductModel } from './../../app/models/product.model';
import { ProductProvider } from './../../providers/product/product';
import { ConfigHelper } from './../../app/helpers/config-helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoryModel } from '../../app/models/category.model';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  selectedCategory: CategoryModel = new CategoryModel()
  products: Array<ProductModel> = new Array<ProductModel>()
  shoppingCart: ShoppingCartModel = new ShoppingCartModel()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private productProvider: ProductProvider,
              public modalCtrl: ModalController,
              private shoppingCartProvider: ShoppingCartProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  ionViewWillEnter(){
    this.shoppingCartProvider.getShoppingCart().subscribe(data => {
      this.shoppingCart = data
      console.log(this.shoppingCart)
    })
    this.selectedCategory = <CategoryModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectedCategory))
    this.load()
  }

  async load(): Promise<void>{
    try{
      let productsResult = await this.productProvider.getByCategoryId(this.selectedCategory._id);
      if (productsResult.success){
        this.products = <Array<ProductModel>>productsResult.data
      }
    }
    catch(error){

    }
  }

  quantityChanged(product: ProductModel, event: number): void{
    console.log(product)
    console.log(event)
    //this.shoppingCartProvider.addItem(product)
  }

  viewProduct(product: ProductModel) {
    let modal = this.modalCtrl.create('ProductDetailPage', { product: product})
    modal.present()
  }

  viewShoppingCart(): void{
    this.navCtrl.push('ShoppingCartPage')
  }
}
