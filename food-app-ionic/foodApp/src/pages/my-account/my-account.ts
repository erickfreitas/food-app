import { ConfigHelper } from './../../app/helpers/config-helper';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { MyAccountModel } from '../../app/models/my-account.model';
import { CameraProvider } from '../../providers/camera/camera';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  loggedUser : MyAccountModel = new MyAccountModel()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userProvider: UserProvider,
              private actionSheetController: ActionSheetController,
              public platform: Platform,
              private camera: CameraProvider) {
  }

  ionViewDidLoad() {
    this.GetUserData()
  }

  // private save(): Promise<void> {
    
  // }

  private imageOptions(): void{
    let action = this.actionSheetController.create({
      title: 'Foto',
      buttons: [
        { 
          text: 'Limpar', 
          handler: () => { 
            this.loggedUser.image = ConfigHelper.photo 
          },
          icon: this.platform.is('ios') ? null : 'trash'  
        },
        { 
          text: 'Tirar Foto', 
          handler: () => {
            this.camera.takePicture(photo => {
              this.loggedUser.image = photo
            })
          }, 
          icon: this.platform.is('ios') ? null : 'camera'  
        },
        { 
          text: 'Cancelar', 
          role: 'destructive',
          handler: () => {

          },
          icon: this.platform.is('ios') ? null : 'close' 
        }
      ]
    })
    action.present()
  }

  async GetUserData(): Promise<void> {
    try{
      let user = <MyAccountModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user))
      let result = await this.userProvider.getById(user._id) 
      if (result.success) {
        this.loggedUser = <MyAccountModel>result.data
      }
      if (!this.loggedUser.image) {
        this.loggedUser.image = ConfigHelper.photo
      }
    }
    catch(error){
      console.log('Problema ao carregar os dados do usuário!')
    }
  }

}
