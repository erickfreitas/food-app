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

  async register(user: UserModel): Promise<HttpResultModel>{
    return this.http.post(`${this.baseUrl}/register`, user)
  }

  static saveLogin(result: any): void {
    localStorage.setItem(ConfigHelper.storageKeys.token, result.data.token)
    localStorage.setItem(ConfigHelper.storageKeys.user, JSON.stringify(result.data.user))
  }

  static get isLogged(): boolean {
    let token = localStorage.getItem(ConfigHelper.storageKeys.token);
    return token !== undefined && token !== null
  }

  static get getTokenAccess(): string{
    return localStorage.getItem(ConfigHelper.storageKeys.token)
  }

}
