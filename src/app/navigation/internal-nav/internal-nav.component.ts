import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-nav',
  templateUrl: './internal-nav.component.html',
  styleUrls: ['./internal-nav.component.scss']
})
export class InternalNavComponent implements OnInit {

  show = false;
  constructor() { }

  ngOnInit(): void {
  }

  showDropdown() {
    this.show = this.show ? false : true;
  }

}
