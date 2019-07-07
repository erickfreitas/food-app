import { HttpResultModel } from './../../app/models/http-result.model';
import { NetworkProvider } from './../network/network';
import { SpinnerProvider } from './../spinner/spinner';
import { AlertProvider } from './../alert/alert';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient,
              private alert: AlertProvider,
              private spinner: SpinnerProvider,
              private network: NetworkProvider) {
    
  }

  get(url: string): Promise<HttpResultModel>{
    this.spinner.show('Carregando os dados...')

    return new Promise((resolve) => {
      if (this.network.isOnline()) {
        this.http.get(url).subscribe(
          response => {
            this.spinner.hide()
            resolve({ success: true, data: response, error: undefined })
        }, error => {
            this.spinner.hide()
            this.alert.toast('Não possível consultar o dados, verifique sua conexão e tente novamente.', 'bottom')
            resolve({ success: false, data: undefined, error: error })
        })
      }
      else{
        this.spinner.hide()
        this.alert.toast('Você está offline, e infelizmente não pode ser carregado os dados.', 'bottom')
        resolve({ success: true, data: undefined, error: undefined})
      }
    })
  }

}
