import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    ComponentsModule
  ],
})
export class MyAccountPageModule {}
