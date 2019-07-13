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

  openProduct(): void{
    this.navCtrl.setRoot('TabsPage')
  }

  openCategory(): void{
    this.navCtrl.push('AdmCategoriesPage')
  }

}
