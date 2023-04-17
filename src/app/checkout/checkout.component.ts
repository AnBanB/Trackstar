import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteService } from '../services/api/auto-complete.service';
import { LocationType } from '../interfaces/addressType';
import { ParcelDetails } from '../interfaces/parcelTypes';
import { ParcelService } from '../services/api/parcel.service';

interface Product {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
}

interface ParishList {
  parish: string
}

interface Couriers {
  courier: string;
  shippingCost: number;
  image: string
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  subTotal: number = 0;
  deliveryCost: number = 0;
  finalTotal: number = 0;
  // Set the default option to zipmail
  selectedCourier = "Zipmail";
  shippingCost!: number;
  filteredLocations: LocationType[] = [];
  // showCheckout: boolean = false;
  errMsg!: string;
  successMsg!: string;

  deliveryForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    parish: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalZone: new FormControl('', [Validators.required]),
    smartCode: new FormControl('', [Validators.required]),
  });

  deliveryOptionsForm = new FormGroup({

    deliveryOption: new FormControl(''),
    note: new FormControl('')
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


  products: Product[] = [{
    name: 'Good Vibration Headphones',
    sku: 'HDO-383',
    quantity: 1,
    price: 8000.00,
    image: '../../assets/headphone.png'
  },
  {
    name: 'Portable Charger',
    sku: 'SHE-372',
    quantity: 1,
    price: 5000.00,
    image: '../../assets/portable-charger.png'
  }
  ];


  deliveryOptions: Couriers[] = [
    {
      courier: 'Zipmail',
      shippingCost: 0,
      image: '../../assets/delivery_options/zipmail.jpg'
    }
  ]




  constructor(
    private autoCompleteService: AutoCompleteService,
    private parcelService: ParcelService) {

  }

  ngOnInit(): void {
    this.calculateSubTotal();

    this.shippingCost = this.deliveryOptions[0].shippingCost;

    this.deliveryForm.controls['addressLine1'].valueChanges.subscribe(addressEntered => {

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

    this.deliveryForm.controls['smartCode'].valueChanges.subscribe(sCode => {
      if (sCode) {
        const quotePayload = {
          merchant_id: 1,
          smartcode_ext: this.deliveryForm.value.smartCode,
          weight: 9
        }
        this.parcelService.getParcelQuote(quotePayload).subscribe({
          next: (quote) => {
            this.shippingCost = quote.cost;
            this.finalTotal = Number(this.subTotal) + Number(this.shippingCost);
          },
          error: (err) => {
            console.log("This is the quote error", err);
            this.errMsg = "The shipping cost calculation failed, please try again";
          }
        })
      }
    });
  }




  calculateSubTotal() {
    let sum = 0;
    for (let product of this.products) {
      sum += product.price * product.quantity;
    }
    this.subTotal = sum;
  }


  checkError(field: string): boolean | undefined {
    return this.deliveryForm.get(field)?.invalid && this.deliveryForm.get(field)?.touched;
  }

  populateAddress(location: LocationType) {
    this.deliveryForm.controls['addressLine1'].setValue(location.civic_address);
    this.deliveryForm.controls['city'].setValue(location.community_name);
    this.deliveryForm.controls['parish'].setValue(location.parish);
    this.deliveryForm.controls['postalZone'].setValue(location.post_zone);
    if (location.smartcode_ext) {
      this.deliveryForm.controls['smartCode'].setValue(location.smartcode_ext);
    }
    this.filteredLocations = [];

  }

  // calculateShipping() {
  //   console.log("Calculating shipping");
  //   if (!this.deliveryForm.valid) {
  //     this.deliveryForm.markAllAsTouched();
  //     console.log("I am invalid");
  //   }
  //   else {
  //     console.log("send me over");
  //     console.log(this.deliveryForm.value);
  //     console.log(this.deliveryOptions);

  //     const packageInfo: ParcelDetails = {
  //       merchant_id: 1,
  //       weightlbs: 20,
  //       recipient_name: this.deliveryForm.value.fullName,
  //       recipient_street_address: this.deliveryForm.value.addressLine1,
  //       recipient_address_line2: this.deliveryForm.value.addressLine2,
  //       recipient_address_line3: "",
  //       recipient_city: this.deliveryForm.value.city,
  //       recipient_parish_state: this.deliveryForm.value.parish,
  //       recipient_post_office: this.deliveryForm.value.postalZone,
  //       recipient_zip_code: this.deliveryForm.value.city,
  //       recipient_address_code: this.deliveryForm.value.smartCode,
  //       recipient_country: "Jamaica",
  //       recipient_email: this.deliveryForm.value.email,
  //       recipient_phone: this.deliveryForm.value.mobileNumber,
  //       customer_id: 98765,
  //       delivery_time_type: "Express",
  //       weight: 20,
  //       delivery_type: "Express",
  //       package_status: "Pending",
  //       created_by: 1
  //     }

  //     this.parcelService.submitParcel(packageInfo).subscribe({
  //       next: (result) => {
  //         console.log("This is the result", result.package_id);
  //       },
  //       error: (err) => {
  //         console.log("This is the error", err);
  //         this.errMsg = "The shipping cost calculation failed, please try again";
  //       }
  //     })
  //   }
  // }

  checkOut() {
    if (!this.deliveryForm.valid) {
      this.deliveryForm.markAllAsTouched();
    }
    else {
      console.log(this.deliveryForm.value);
      console.log("Cost", this.deliveryOptions);

      if (Number(this.shippingCost) == Number(0.00)) {
        this.errMsg = "You are currently unable to place this order as the shipping cost could not be generated. Please try again later";
      }
      else {

        const packageInfo: ParcelDetails = {
          merchant_id: 1,
          weightlbs: 20,
          recipient_name: this.deliveryForm.value.fullName,
          recipient_street_address: this.deliveryForm.value.addressLine1,
          recipient_address_line2: this.deliveryForm.value.addressLine2,
          recipient_address_line3: "",
          recipient_city: this.deliveryForm.value.city,
          recipient_parish_state: this.deliveryForm.value.parish,
          recipient_post_office: this.deliveryForm.value.postalZone,
          recipient_zip_code: this.deliveryForm.value.city,
          recipient_address_code: this.deliveryForm.value.smartCode,
          recipient_country: "Jamaica",
          recipient_email: this.deliveryForm.value.email,
          recipient_phone: this.deliveryForm.value.mobileNumber,
          customer_id: 98765,
          delivery_time_type: "Express",
          weight: 20,
          delivery_type: "Express",
          package_status: "Pending",
          created_by: 1
        }

        this.parcelService.submitParcel(packageInfo).subscribe({
          next: (result) => {
            this.successMsg = "Your order is complete";
          },
          error: (err) => {
            console.log("This is the error", err);
            this.errMsg = "An issue has occured while placing this order. Please try again";
          }
        })
      }
    }
  }



}
