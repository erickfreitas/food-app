import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: any = {}

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')
  }

  async login(): Promise<void>{
    let response = await this.userProvider.authenticate(this.form.email, this.form.password)
    if(response.success){
      console.log(response);      
    }
    // this.navCtrl.setRoot('CategoriesPage')
  }
}
