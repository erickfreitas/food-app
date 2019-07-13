import { CategoryModel } from './../../app/models/category.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adm-category',
  templateUrl: 'adm-category.html',
})
export class AdmCategoryPage {

  category: CategoryModel = new CategoryModel()

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmCategoryPage');
    let _category = <CategoryModel>this.navParams.get('_category')
    if (_category != undefined) this.category = _category
  }

  saveOrEdit(category: CategoryModel): void{
    
  }

}
