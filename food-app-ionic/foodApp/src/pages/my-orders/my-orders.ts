import { ShoppingCartProvider } from './../../providers/shopping-cart/shopping-cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderListModel } from '../../app/models/order-list.model';

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {

  orderList: Array<OrderListModel> = new Array<OrderListModel>()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private shoppingCartProvider: ShoppingCartProvider) {
  }

  ionViewDidLoad() {
    this.getOrders()
  }

  private async getOrders(): Promise<void> {
    try{
      let result = await this.shoppingCartProvider.getOrders()
      if (result.success){
        this.orderList = <Array<OrderListModel>>result.data
      }
    }
    catch(error){
      console.log(error)
    }
  }

  private getTotalItems(orderList: OrderListModel): number {
    try {
        let _items = JSON.parse(orderList.items)
        return _items.length
    }
    catch(error) {
        return 0
    }
}

}
