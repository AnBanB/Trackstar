import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostOfficeParcelPayload, ParcelDetails } from 'src/app/interfaces/parcelTypes';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { LocalstoreService } from '../localstore.service';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(
    private httpClient: HttpClient,
    private localStore: LocalstoreService
  ) {

  }
  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.localStore.getData("token")}`
  }


  submitParcel(parcel: ParcelDetails) {
    return this.httpClient.post(`${environment.apiURL}/package/merchantregister`, parcel).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getParcelQuote(packagePayload: any) {
    return this.httpClient.post(`${environment.apiURL}/package/getLiveQuote`, packagePayload).pipe(
      map((data: any) => {
        return data;
      })
    )
  }


  getMerchantParcel(emailPayload: any) {
    return this.httpClient.post(`${environment.apiURL}/package/getmerchantpackages`, emailPayload).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getPostParcel(emailPayload: any) {
    return this.httpClient.post(`${environment.apiURL}/notify/getparcels/`, emailPayload).pipe(
      map((data) => {
        return data;
      })
    )
  }

  addParcelAtPostOffice(parcelPayload: PostOfficeParcelPayload) {
    return this.httpClient.post(`${environment.apiURL}/notify/addparcel/`, parcelPayload, { headers: this.headers }).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
