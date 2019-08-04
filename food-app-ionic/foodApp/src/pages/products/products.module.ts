import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ProductsPage),
  ],
})
export class ProductsPageModule {}
