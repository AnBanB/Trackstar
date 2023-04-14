import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstoreService } from 'src/app/services/localstore.service';

@Component({
  selector: 'app-internal-nav',
  templateUrl: './internal-nav.component.html',
  styleUrls: ['./internal-nav.component.scss']
})
export class InternalNavComponent implements OnInit {

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

  logout() {
    this.localStore.removeData("token");
    this.router.navigateByUrl("/trackstar/login");
  }

}
