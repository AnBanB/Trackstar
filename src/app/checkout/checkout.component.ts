import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  // Set the default option to zipmail
  selectedCourier = "Zipmail";
  shippingCost!: number;

  deliveryForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
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
      shippingCost: 450,
      image: '../../assets/delivery_options/zipmail.jpg'
    }
  ]




  constructor() {

  }

  ngOnInit(): void {
    this.calculateSubTotal();

    this.shippingCost = this.deliveryOptions[0].shippingCost;
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

  submitDeliveryDetails() {
    if (!this.deliveryForm.valid) {
      this.deliveryForm.markAllAsTouched();
    }
    else{
      console.log(this.deliveryForm.value);
      console.log(this.deliveryOptions);
    }
  }




}
