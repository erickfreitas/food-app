import { HttpResultModel } from '../models/http-result.model';
import { HttpProvider } from '../../providers/http/http';

export abstract class ProviderBase<T> {
    constructor(private url: string,
                public http: HttpProvider) {        
    }

    get(): Promise<HttpResultModel>{
        return this.http.get(this.url)
    }

    getById(id: string): Promise<HttpResultModel>{
        return this.http.get(`${this.url}/${id}`)
    }

    post(model: T): Promise<HttpResultModel>{
        return this.http.post(this.url, model)
    }

    put(id:string, model: T): Promise<HttpResultModel>{
        return this.http.put(`${this.url}/${id}`, model)
    }

    delete(id: string): Promise<HttpResultModel>{
        return this.http.delete(`${this.url}/${id}`)
    }
}