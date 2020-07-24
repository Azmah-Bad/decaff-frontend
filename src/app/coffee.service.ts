import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CaffeineToday } from './caffeine-today';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private api = "http://localhost:3000/api";
  private KEY_USERID = "userID"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCoffeeIntake(userID: Number): Observable<CaffeineToday> {
    let url = this.api + "/" + this.KEY_USERID + "/" + userID
    return this.http.get<CaffeineToday>(url, this.httpOptions)

  }


}
