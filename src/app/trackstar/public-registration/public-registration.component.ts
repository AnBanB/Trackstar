import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface ParishList {
  parish: string
}

@Component({
  selector: 'app-public-registration',
  templateUrl: './public-registration.component.html',
  styleUrls: ['./public-registration.component.scss']
})
export class PublicRegistrationComponent implements OnInit {

 

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNumber: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    parish: new FormControl('', Validators.required),
    postalZone: new FormControl('', Validators.required),
    smartCode: new FormControl('', Validators.required)
  });

  parishes: ParishList[] = [
    { parish: 'Clarendon' },
    { parish: 'Hanover' },
    { parish: 'Kingston' },
    { parish: 'Manchester' },
    { parish: 'Portland' },
    { parish: 'St. Andrew' },
    { parish: 'St. Ann' },
    { parish: 'St. Catherine' },
    { parish: 'St. Elizabeth' },
    { parish: 'St. James' },
    { parish: 'St. Mary' },
    { parish: 'St. Thomas' },
    { parish: 'Trelawny' },
    { parish: 'Westmoreland' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  register() {

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      console.log("These are the forms", this.registerForm.value);
    }

  }

  checkError(field: string): boolean | undefined {
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched;
  }


}
