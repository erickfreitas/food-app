import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrdersPage } from './my-orders';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MyOrdersPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(MyOrdersPage),
    ComponentsModule
  ],
})
export class MyOrdersPageModule {}
