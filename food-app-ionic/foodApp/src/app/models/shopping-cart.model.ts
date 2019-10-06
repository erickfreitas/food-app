import { ShoppingCartItemModel } from "./shopping-cart-item.model"

export class ShoppingCartModel {
    dateTime: Date
    items: Array<ShoppingCartItemModel>

    constructor() {
        this.items = new Array<ShoppingCartItemModel>()
    }

    getTotalValue():number {
        let totalValue: number
        this.items.forEach((item) => {
            totalValue += item.product.price * item.quantity
        })
        return totalValue
    }
}