import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
    ComponentsModule,
    PipesModule
  ],
})
export class ShoppingCartPageModule {}
