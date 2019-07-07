import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  selectCategory(event):void{
    console.log(event);
    let penultimateNavigation = event.linker._history[event.linker._history.length - 2]
    if(event.tabTitle == 'Categorias' && penultimateNavigation != '/categories'){
      this.app.getRootNav().setRoot('CategoriesPage');
    }
  }

}
