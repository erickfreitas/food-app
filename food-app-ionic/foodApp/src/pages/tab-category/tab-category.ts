import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab-category',
  templateUrl: 'tab-category.html',
})
export class TabCategoryPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabCategoryPage');
    // this.app.getRootNav().setRoot(CategoriesPage)
  }

}
