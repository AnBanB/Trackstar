import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface ParishList {
  parish: string
}

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class CourierDeliveriesComponent implements OnInit {

  packageForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
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

  submit() {

    if (!this.packageForm.valid) {
      this.packageForm.markAllAsTouched();
    }
    else {
      console.log("These are the forms", this.packageForm.value);
    }

  }

  checkError(field: string): boolean | undefined {
    return this.packageForm.get(field)?.invalid && this.packageForm.get(field)?.touched;
  }

}
