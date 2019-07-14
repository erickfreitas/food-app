import { UserProvider } from './../user/user';
import { HttpResultModel } from './../../app/models/http-result.model';
import { NetworkProvider } from './../network/network';
import { SpinnerProvider } from './../spinner/spinner';
import { AlertProvider } from './../alert/alert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient,
              private alert: AlertProvider,
              private spinner: SpinnerProvider,
              private network: NetworkProvider) {
    
  }

  createHeader(headers?: HttpHeaders): HttpHeaders{
    if (!headers){
      headers = new HttpHeaders()
    }
    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Accept', 'application/json')

    let token = UserProvider.getTokenAccess
    if (token){
      headers = headers.append('authorization', token)
    }

    return headers
  }

  get(url: string): Promise<HttpResultModel>{
    this.spinner.show('Carregando os dados...')

    return new Promise((resolve) => {
      if (this.network.isOnline) {
        this.http.get(url, { headers: this.createHeader() }).subscribe(
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

  post(url: string, model: any): Promise<HttpResultModel>{
    this.spinner.show('Salvando informações...')

    return new Promise((resolve) => {
      if(this.network.isOnline){
        this.http.post(url, model, { headers: this.createHeader() }).subscribe(
          response => {
            this.spinner.hide()
            resolve({ success: true, data: response, error: undefined })
          }, error =>{
            this.spinner.hide()
            if(error.status == 400){
              let message = ''
              console.log(error)
              error.error.validation.forEach(_error => {                
                message += `<li>${_error.message}</li>`
              });
              this.alert.alert(error.error.message, message)
            }
            else if(error.status == 404){
              console.log(error);
              this.alert.alert('Informação', error.error.message)
            }
            else{
              this.spinner.hide()
              this.alert.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom')
            }
            resolve({ success: false, data: undefined, error: error })
          }
        )
      }
      else{
        this.spinner.hide()
        this.alert.toast('Você está offline, e infelizmente não pode ser enviado os dados.', 'bottom')
        resolve({ success: true, data: undefined, error: undefined })
      }
    })
  }

  put(url: string, model: any): Promise<HttpResultModel>{
    this.spinner.show('Salvando informações...')

    return new Promise((resolve) => {
      if(this.network.isOnline){
        this.http.put(url, model, { headers: this.createHeader() }).subscribe(
          response => {
            this.spinner.hide()
            resolve({ success: true, data: response, error: undefined })
          }, error =>{
            this.spinner.hide()
            if(error.status == 400){
              let message = ''
              error.error.validation.forEach(_error => {
                message += `<li>${_error.message}</li>`
              });
              this.alert.alert(error.error.message, message)
            }
            else if(error.status == 404){
              this.alert.toast('Informação', error.error.message)
            }
            else{
              this.spinner.hide()
              this.alert.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom')
            }
            resolve({ success: false, data: undefined, error: error })
          }
        )
      }
      else{
        this.spinner.hide()
        this.alert.toast('Você está offline, e infelizmente não pode ser enviado os dados.', 'bottom')
        resolve({ success: true, data: undefined, error: undefined })
      }
    })
  }

  delete(url: string): Promise<HttpResultModel>{
    this.spinner.show('Carregando os dados...')

    return new Promise((resolve) => {
      if (this.network.isOnline) {
        this.http.delete(url, { headers: this.createHeader() }).subscribe(
          response => {
            this.spinner.hide()
            resolve({ success: true, data: response, error: undefined })
        }, error => {
            this.spinner.hide()
            this.alert.toast('Não possível foi possivel realizar a exclusão do registro.', 'bottom')
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
