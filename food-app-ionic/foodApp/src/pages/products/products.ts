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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private productProvider: ProductProvider,
              public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  ionViewWillEnter(){
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

  quantityChanged(product: ProductModel, event): void{
    console.log(product)
    console.log(event)
  }

  viewProduct(product: ProductModel) {
    let modal = this.modalCtrl.create('ProductDetailPage', { product: product})
    modal.present()
  }

}
