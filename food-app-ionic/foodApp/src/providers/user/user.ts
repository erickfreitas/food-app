import { ConfigHelper } from './../../app/helpers/config-helper';
import { HttpProvider } from './../http/http';
import { UserModel } from './../../app/models/user.model';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/provider-base';
import { HttpResultModel } from '../../app/models/http-result.model';

@Injectable()
export class UserProvider extends ProviderBase<UserModel>{
  
  baseUrl: string = `${ConfigHelper.url}/users`

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.url}/users`, http)
  }

  async authenticate(email: string, password: string): Promise<HttpResultModel>{
    return this.http.post(`${this.baseUrl}/authenticate`, { email: email, password: password })
  }

}
