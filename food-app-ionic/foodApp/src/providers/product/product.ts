import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/provider-base';
import { ConfigHelper } from '../../app/helpers/config-helper';
import { ProductModel } from '../../app/models/product.models';
import { HttpProvider } from '../http/http';

@Injectable()
export class ProductProvider extends ProviderBase<ProductModel>{

  baseUrl: string = `${ConfigHelper.url}/products`

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.url}/products`, http)
  }
}
