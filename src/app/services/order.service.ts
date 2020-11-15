import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    let token = localStorage.getItem('token');
    let headerVal = new HttpHeaders().set('Authorization', 'Bearer' + token);

    return this.http.get('/api/orders', { headers : headerVal })
      .pipe(
        map(response => response)
      )
  };
}
