import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { ProductModel } from '../../app/models/product.models';
import { ProductProvider } from '../../providers/product/product';
import { HttpResultModel } from '../../app/models/http-result.model';
import { CameraProvider } from '../../providers/camera/camera';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the AdmProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-product',
  templateUrl: 'adm-product.html',
})
export class AdmProductPage {

  product: ProductModel = new ProductModel()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public platform: Platform,
              public camera: CameraProvider,
              public productProvider: ProductProvider,
              public alert: AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmProductPage');
    let _product = <ProductModel>this.navParams.get('_product')
    if (_product != undefined) this.product = _product
    console.log(this.product)
  }

  async remove(): Promise<void>{
    try{
      this.alert.confirm("Excluir?", `Deseja realmente excluir o produto ${this.product.title}?`, async () => {
        let result = await this.productProvider.delete(this.product._id)
        if (result.success){
          this.alert.toast('Produto excluída com sucesso', 'buttom')
          this.navCtrl.setRoot('AdmCategoriesPage')
        }
      })
    }
    catch(error){
      this.alert.toast('Houve uma falha ao tentar excluir o produto.', 'buttom')
    }
  }

  async saveOrEdit(product: ProductModel): Promise<void>{
    let result = new HttpResultModel()
    debugger
    if (product._id == null){
      result = await this.productProvider.post(product)
      this.alert.toast('Cadastro realizado com sucesso.', 'buttom')
    }
    else{
      result = await this.productProvider.put(product._id, product)
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
              this.product.image = photo
            })
          }, 
          icon: this.platform.is('ios') ? null : 'camera' 
        },
        {
          text: 'Pegar da Galeria',
          handler: () => {
            this.camera.getPictureFromGalery(photo => {
              this.product.image = photo
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
