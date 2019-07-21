import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage')
  }

  openTabs(): void{
    this.navCtrl.setRoot('TabsPage')
  }

  openProduct(): void{
    this.navCtrl.push('AdmProductsPage')
  }

  openCategory(): void{
    this.navCtrl.push('AdmCategoriesPage')
  }

}
