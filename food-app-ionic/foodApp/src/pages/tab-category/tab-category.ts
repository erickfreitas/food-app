import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab-category',
  templateUrl: 'tab-category.html',
})
export class TabCategoryPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app: App) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabCategoryPage');
    // this.app.getRootNav().setRoot(CategoriesPage)
  }

}
