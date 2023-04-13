import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { memberPayload } from 'src/app/interfaces/memberType';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  createMember(memberPayload: memberPayload) {
    return this.httpClient.post(`${environment.apiURL}/notify/signup`, memberPayload).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
