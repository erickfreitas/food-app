import { HttpProvider } from './../http/http';
import { CategoryModel } from './../../app/models/category.model';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/provider-base';
import { ConfigHelper } from '../../app/helpers/config-helper';

@Injectable()
export class CategoryProvider extends ProviderBase<CategoryModel>{

  baseUrl: string = `${ConfigHelper.url}/categories`

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.url}/categories`, http)
  }

}
