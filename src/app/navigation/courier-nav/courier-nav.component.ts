import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courier-nav',
  templateUrl: './courier-nav.component.html',
  styleUrls: ['./courier-nav.component.scss']
})
export class CourierNavComponent implements OnInit {

  show = false;
  constructor() { }

  ngOnInit(): void {
  }

  showDropdown() {
    this.show = this.show ? false : true;
  }

}
