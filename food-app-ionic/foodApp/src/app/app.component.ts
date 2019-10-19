import { ConfigHelper } from './helpers/config-helper';
import { OneSignal } from '@ionic-native/onesignal';
import { UserProvider } from './../providers/user/user';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserProvider.isLogged ? 'CategoriesPage' : 'LoginPage';

  constructor(private platform: Platform,
              private oneSignal: OneSignal, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this._configureOneSignal();
    });
  }

  private _configureOneSignal():void {
    if (this.platform.is('cordova')) {

      this.oneSignal.startInit('8042d7d3-4d25-4c80-a4b3-e21c481fad74')

      
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // do something when notification is received
        console.log('notificação recebida.', data)
       });
       
       this.oneSignal.handleNotificationOpened().subscribe((data) => {
         // do something when a notification is opened
         console.log('notificação aberta.', data)
       });

       this.oneSignal.getIds().then(result => {
         localStorage.setItem(ConfigHelper.storageKeys.oneSignalId, result.userId)
         localStorage.setItem(ConfigHelper.storageKeys.oneSignalPushToken, result.pushToken)
         console.log('OneSignal', JSON.stringify(result))
       })
       
       this.oneSignal.endInit();
    }    
  }
}

