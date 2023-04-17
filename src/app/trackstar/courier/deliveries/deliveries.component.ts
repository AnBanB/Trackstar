import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationType } from 'src/app/interfaces/addressType';
import { AutoCompleteService } from 'src/app/services/api/auto-complete.service';
import { ParcelService } from 'src/app/services/api/parcel.service';
import {PostOfficeParcelPayload} from 'src/app/interfaces/parcelTypes'
import { LocalstoreService } from 'src/app/services/localstore.service';

interface ParishList {
  parish: string
}

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class CourierDeliveriesComponent implements OnInit {

  filteredLocations: LocationType[] = [];
  errMsg!: string;
  successMsg!: string;
  courierParcels!: any;
  userEmail!:string;

  packageForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    parish: new FormControl('', Validators.required),
    postalZone: new FormControl('', Validators.required),
    smartCode: new FormControl('', Validators.required),
    scanToText: new FormControl('')
  });


  parishes: ParishList[] = [
    { parish: 'Clarendon' },
    { parish: 'Hanover' },
    { parish: 'Kingston' },
    { parish: 'Manchester' },
    { parish: 'Portland' },
    { parish: 'St.Andrew' },
    { parish: 'St.Ann' },
    { parish: 'St.Catherine' },
    { parish: 'St.Elizabeth' },
    { parish: 'St.James' },
    { parish: 'St.Mary' },
    { parish: 'St.Thomas' },
    { parish: 'Trelawny' },
    { parish: 'Westmoreland' }
  ]

  constructor(
    private autoCompleteService: AutoCompleteService,
    private parcelService: ParcelService,
    private localStore: LocalstoreService
  ) { }

  ngOnInit(): void {

    this.getParcels();


    this.packageForm.controls['addressLine1'].valueChanges.subscribe(addressEntered => {

      console.log("Address details", addressEntered);
      if (addressEntered) {
        this.autoCompleteService.getAddress(addressEntered).subscribe({
          next: (addressList) => {
            this.filteredLocations = addressList;
            //stop the popup from still showing after an address is selected
            if (addressEntered === this.filteredLocations[0].civic_address) {
              this.filteredLocations = [];
            }
          }
        })
      }
      else {
        this.filteredLocations = [];
      }
    });
  }

  getParcels()
  {
    console.log("This is the email", this.localStore.getData("email"));
    this.userEmail = this.localStore.getData("email")!;
    const emailPayload = {
      email: this.userEmail
    }
    this.parcelService.getPostParcel(emailPayload).subscribe({
      next: (results) => {
        console.log("These are the parcels", results);
        this.courierParcels = results;
      },
      error: (err) => {
        console.log("These are the errors", err);
      }
    });

  }

  submit() {

    if (!this.packageForm.valid) {
      this.packageForm.markAllAsTouched();
    }
    else {

      const packagePayload: PostOfficeParcelPayload = {
        recipient_name: this.packageForm.value.fullname,
        recipient_address: this.packageForm.value.addressLine1,
        full_address_code: this.packageForm.value.smartCode,
        parcel_type: "Letter",
        received_date: new Date().toISOString().substring(0,10),
        received_by: 1,
        postal_location: this.packageForm.value.postalZone,
        addressline1: this.packageForm.value.addressLine1,
        addressline2: this.packageForm.value,
        city: this.packageForm.value.city,
        parish: this.packageForm.value.parish,
        postalzone: this.packageForm.value.postalZone,
        smartcode: this.packageForm.value.smartCode
      }


      this.parcelService.addParcelAtPostOffice(packagePayload).subscribe({
        next: (result) => {
          console.log("Package submittted", result);
          this.successMsg = "The package was submitted successfully";
          this.getParcels();
        },
        error: (err) => {
          console.log("Package could not be submittted", err);
          this.errMsg = "The package could not be submitted. Please try again later";
        }
      });
    }

  }

  checkError(field: string): boolean | undefined {
    return this.packageForm.get(field)?.invalid && this.packageForm.get(field)?.touched;
  }

  populateAddress(location: LocationType) {
    console.log("This is the location", location);
    this.packageForm.controls['addressLine1'].setValue(location.civic_address);
    this.packageForm.controls['city'].setValue(location.community_name);
    this.packageForm.controls['parish'].setValue(location.parish);
    this.packageForm.controls['postalZone'].setValue(location.post_zone);
    if (location.smartcode_ext) {
      this.packageForm.controls['smartCode'].setValue(location.smartcode_ext);
    }
    this.filteredLocations = [];

  }

}
