import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  subTotal!: number;

  deliveryForm = new FormGroup({
    fullName: new FormControl(''),
    mobileNumber: new FormControl(''),
    email: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    parish: new FormControl(''),
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



  constructor() {

  }

  ngOnInit(): void {
  }

  updateSubTotal() {

    this.subTotal = this.products.reduce((acc, product) => (product.price * product.quantity), 0)

  }



}
