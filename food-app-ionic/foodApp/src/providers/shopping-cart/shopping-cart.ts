import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ShoppingCartProvider Provider');
  }

}
