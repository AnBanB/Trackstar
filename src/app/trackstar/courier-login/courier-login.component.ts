import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courier-login',
  templateUrl: './courier-login.component.html',
  styleUrls: ['./courier-login.component.scss']
})
export class CourierLoginComponent implements OnInit {

  loginForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl('')

  });


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
    else {
      console.log("These are the forms", this.loginForm.value);
      this.router.navigateByUrl("trackstar/courier/deliveries");
    }
  }

  checkError(field: string): boolean | undefined {
    return this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched;
  }
}
