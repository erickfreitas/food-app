import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrdersPage } from './my-orders';

@NgModule({
  declarations: [
    MyOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrdersPage),
    ComponentsModule
  ],
})
export class MyOrdersPageModule {}
