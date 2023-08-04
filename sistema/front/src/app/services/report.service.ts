import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http/';
import { Global } from './Global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getCountVentasBySeller(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'report/count-ventas', {
      headers: headers,
    })
  }
  getCountProdByCategory(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/report/count-products', {
      headers: headers,
    })
  }
}
