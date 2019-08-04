import { ConfigHelper } from './../../app/helpers/config-helper';
import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CategoryModel } from '../../app/models/category.model';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories: Array<CategoryModel> = new Array<CategoryModel>()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private categoryProvider: CategoryProvider,
              private actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage')
  }

  ionViewWillEnter(){
    this._loadData()
  }

  openProducts(category: CategoryModel): void{
    localStorage.setItem(ConfigHelper.storageKeys.selectedCategory, JSON.stringify(category))
    this.navCtrl.setRoot('TabsPage')
  }

  private openProduct(): void{
    this.navCtrl.push('AdmProductsPage')
  }

  private openCategory(): void{
    this.navCtrl.push('AdmCategoriesPage')
  }

  private adminOptions(): void{
    let action = this.actionSheetController.create({
      title: 'Administração',
      buttons: [
        { text: 'Gerenciar Categorias', handler: () => { this.openCategory() } },
        { text: 'Gerenciar Produtos', handler: () => { this.openProduct() } },
        { text: 'Cancelar', handler: () => { }, role: 'destructive' }
      ]
    })
    action.present()
  }

  private async _loadData(): Promise<void>{
    try{
      let result = await this.categoryProvider.get();
      if (result.success){
        this.categories = <Array<CategoryModel>>result.data
      }
    }
    catch(error){

    }
  }

}
