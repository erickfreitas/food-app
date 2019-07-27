import { ProductProvider } from './../../providers/product/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductModel } from '../../app/models/product.model';

@IonicPage()
@Component({
  selector: 'page-adm-products',
  templateUrl: 'adm-products.html',
})
export class AdmProductsPage {

  products: Array<ProductModel> = new Array<ProductModel>()
  isLoading: boolean = true

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productProvider: ProductProvider) 
    {
      this._loadData()
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmProductsPage');
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this._loadData()
  }

  private async _loadData(): Promise<void>{
    try{
      let result = await this.productProvider.get()
      if (result.success){
        this.isLoading = false
        this.products = <Array<ProductModel>>result.data
      }
    }
    catch(error){

    }
  }

  openProductForm(product?: ProductModel): void{
    this.navCtrl.push('AdmProductPage', { _product : product })
  }

}
