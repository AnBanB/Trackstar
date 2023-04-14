import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteService } from '../../services/api/auto-complete.service';
import { LocationType } from '../../interfaces/addressType';
import { AuthService } from 'src/app/services/api/auth.service';
import { TitleCasePipe } from '@angular/common';

interface ParishList {
  parish: string
}

@Component({
  selector: 'app-public-registration',
  templateUrl: './public-registration.component.html',
  styleUrls: ['./public-registration.component.scss']
})
export class PublicRegistrationComponent implements OnInit {

  filteredLocations: LocationType[] = [];
  selected: boolean = false;
  errMsg!: string;
  successMsg!: string;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNumber: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    parish: new FormControl('', Validators.required),
    postalZone: new FormControl('', Validators.required),
    smartCode: new FormControl(''),
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm.controls['addressLine1'].valueChanges.subscribe(addressEntered => {

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

  register() {

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      const payload = {
        member_name: this.registerForm.value.name,
        member_address: this.registerForm.value.addressLine1 + " " + this.registerForm.value.addressLine2
          + " " + this.registerForm.value.city + " " + this.registerForm.value.parish + " " + this.registerForm.value.postalZone + " " +
          this.registerForm.value.smartCode,
        full_address_code: "",
        email: this.registerForm.value.emailAddress,
        mobile: this.registerForm.value.phoneNumber,
        password: "",
        addressline1: this.registerForm.value.addressLine1,
        addressline2: this.registerForm.value.addressLine2,
        city: this.registerForm.value.city,
        parish: this.registerForm.value.parish,
        postalzone: this.registerForm.value.postalZone,
        smartcode: this.registerForm.value.smartCode
      }
      this.authService.createMember(payload).subscribe({
        next: (result) => {
          console.log("This is the results", result);
          this.successMsg = "Your user was created sucessfully";
        },
        error: (err) => {
          console.log("This is the err", err);
          this.errMsg = "TrackStar is unable to create your user. Please try again later";
        }
      });
    }

  }

  checkError(field: string): boolean | undefined {
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched;
  }



  populateAddress(location: LocationType) {
    console.log(location);
    this.registerForm.controls['addressLine1'].setValue(location.civic_address);
    this.registerForm.controls['city'].setValue(location.community_name);
    this.registerForm.controls['parish'].setValue(location.parish);
    this.registerForm.controls['postalZone'].setValue(location.post_zone);
    if (location.smartcode_ext) {
      this.registerForm.controls['smartCode'].setValue(location.smartcode_ext);
    }
    this.filteredLocations = [];

  }


}
