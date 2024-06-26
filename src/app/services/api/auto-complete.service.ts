import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private httpClient: HttpClient) { }

  private apiKey: string = "5ca896ff-300c-11ef-b7c3-0242ac110002";

  headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': `${this.apiKey}`
  }

  getAddress(address: string) {
    return this.httpClient.get(`${environment.ysmartApiURL}/smart-business/auto-complete?q=${address}`, { headers: this.headers })
      .pipe(
        map((data: any) => {
          return data;
        })
      )
  }
}
