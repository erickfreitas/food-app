import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryModel } from '../../app/models/category.model';

@IonicPage()
@Component({
  selector: 'page-adm-categories',
  templateUrl: 'adm-categories.html',
})
export class AdmCategoriesPage {

  categories: Array<CategoryModel> = new Array<CategoryModel>()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoryProvider: CategoryProvider) 
    {
      this._loadData()
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmCategoriesPage');
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

  openCategoryForm(category?: CategoryModel): void{
    this.navCtrl.push('AdmCategoryPage', { _category : category })
  }

}
