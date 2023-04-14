import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from 'src/app/services/localstore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courier-nav',
  templateUrl: './courier-nav.component.html',
  styleUrls: ['./courier-nav.component.scss']
})
export class CourierNavComponent implements OnInit {

  show = false;
  constructor(
    private localStore: LocalstoreService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  showDropdown() {
    this.show = this.show ? false : true;
  }

  logout()
  {
    this.localStore.removeData("token");
    this.router.navigateByUrl("/trackstar/courier/login");
  }

}
