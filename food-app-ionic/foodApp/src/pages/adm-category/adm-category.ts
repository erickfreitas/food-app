import { HttpResultModel } from './../../app/models/http-result.model';
import { AlertProvider } from './../../providers/alert/alert';
import { CategoryProvider } from './../../providers/category/category';
import { CameraProvider } from './../../providers/camera/camera';
import { CategoryModel } from './../../app/models/category.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adm-category',
  templateUrl: 'adm-category.html',
})
export class AdmCategoryPage {

  category: CategoryModel = new CategoryModel()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public platform: Platform,
              public camera: CameraProvider,
              public categoryProvider: CategoryProvider,
              public alert: AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmCategoryPage');
    let _category = <CategoryModel>this.navParams.get('_category')
    if (_category != undefined) this.category = _category
    console.log(this.category)
  }

  async saveOrEdit(category: CategoryModel): Promise<void>{
    let result = new HttpResultModel()
    debugger
    if (category._id == null){
      result = await this.categoryProvider.post(category)
      this.alert.toast('Cadastro realizado com sucesso.', 'buttom')
    }
    else{
      result = await this.categoryProvider.put(category._id, category)
      this.alert.toast('Cadastro atualizado com sucesso.', 'buttom')
    }    
    if (result.success){      
      this.navCtrl.setRoot('AdmCategoriesPage')
    }
  }

  getPictureOption(): void{
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Adicionar foto',
      buttons: [
        {
          text: 'Tirar Foto', 
          handler: () => {
            this.camera.takePicture(photo => {
              this.category.image = photo
            })
          }, 
          icon: this.platform.is('ios') ? null : 'camera' 
        },
        {
          text: 'Pegar da Galeria',
          handler: () => {
            this.camera.getPictureFromGalery(photo => {
              this.category.image = photo
            })
          },
          icon: this.platform.is('ios') ? null : 'images'
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
    actionSheet.present()
  }

}
