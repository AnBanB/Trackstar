import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from 'src/app/services/localstore.service';
import { ParcelService } from 'src/app/services/api/parcel.service';
import { ParcelDetailsResponse } from 'src/app/interfaces/parcelTypes';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  userEmail!: string;
  merchantParcels!: any;
  constructor(
    private localStore: LocalstoreService,
    private parcelService: ParcelService
  ) { }

  ngOnInit(): void {
    console.log("This is the email", this.localStore.getData("email"));
    this.userEmail =  this.localStore.getData("email")!;

    const emailPayload = {
      username: this.userEmail
    }
    this.parcelService.getMerchantParcel(emailPayload).subscribe({
      next: (results) => {
        console.log("These are the parcels", results);
        this.merchantParcels = results;
      },
      error: (err) => {
        console.log("These are the errors", err);
      }
    });
  }

}
