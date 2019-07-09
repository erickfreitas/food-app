import { AlertProvider } from './../../providers/alert/alert';
import { UserProvider } from './../../providers/user/user';
import { UserModel } from './../../app/models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  form: UserModel = new UserModel();

  constructor(public navCtrl: NavController,  
              public navParams: NavParams,
              private userProvider: UserProvider,
              private alert: AlertProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  backTologin():void{
    this.navCtrl.setRoot('LoginPage')
  }

  async register():Promise<void>{
    let registerResult = await this.userProvider.register(this.form)
    if(registerResult.success){
      this.alert.toast('Cadastro Realizado com sucesso.', 'bottom')
      this.navCtrl.setRoot('LoginPage')
    }
  }

}
