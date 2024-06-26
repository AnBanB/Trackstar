import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private httpClient: HttpClient) { }

  private apiKey: string = "6186ee46-ae58-4523-ae97-23e6c3e8729f";

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
