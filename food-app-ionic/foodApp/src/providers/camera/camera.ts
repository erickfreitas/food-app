import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraProvider {

  constructor(private platform: Platform, private camera: Camera) {
    console.log('Hello CameraProvider Provider');
  }

  private _getPicture(source: number, callback): void{
    if (this.platform.is('cordova')){
      this.platform.ready().then(() => {
        try{
          let options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: source,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true
          }

          this.camera.getPicture(options).then((imageData) => {
            let base64Image = `data:image/jpeg;base64,${imageData}`
            callback(base64Image)
          }, _error => {
            console.log("Problema ao capturar foto.", _error);            
          })
        }
        catch(error){
          console.log("Problema ao capturar foto.", error);
        }
      })
    }
    else{
      alert('Funcionalidade disponível somente no device.')
    }
  }

  getPictureFromGalery(callback):void{
    this._getPicture(this.camera.PictureSourceType.PHOTOLIBRARY, photo => { callback(photo) })
  }

  takePicture(callback):void{
    this._getPicture(this.camera.PictureSourceType.CAMERA, photo => { callback(photo) })
  }
}
