import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CaffeineToday } from './caffeine-today';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private api = "https://7eeafd76fc80.ngrok.io/api";
  private KEY_USERID = "userID"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCoffeeIntake(userID: Number): Observable<CaffeineToday> {
    let url = this.api + "/" + this.KEY_USERID + "/" + userID
    return this.http.get<CaffeineToday>(url, this.httpOptions)

  }

  newIntake(caffeine: number, userID: number) {
    let time = this.timeFormatter(new Date());    
    let url = this.api + `/userID/${userID}/caffeine/${caffeine}/TIME/${time}`;

    this.http.post(url, null,{headers: new HttpHeaders({ 'Content-Type': 'text' })}).subscribe(() => {
      console.log("posted")
    });
  }

  timeFormatter(date):string {
      return date.getFullYear()
                + '-' + this.leftpad(date.getMonth() + 1, 2)
                + '-' + this.leftpad(date.getDate(), 2)
                + '%20' + this.leftpad(date.getHours(), 2)
                + ':' + this.leftpad(date.getMinutes(), 2)
                + ':' + this.leftpad(date.getSeconds(), 2);
    
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
  }


}
