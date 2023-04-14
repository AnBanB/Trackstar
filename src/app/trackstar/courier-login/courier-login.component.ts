import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostOfficeLoginPayload } from 'src/app/interfaces/authTypes';
import { AuthService } from 'src/app/services/api/auth.service';
import { LocalstoreService } from 'src/app/services/localstore.service';

@Component({
  selector: 'app-courier-login',
  templateUrl: './courier-login.component.html',
  styleUrls: ['./courier-login.component.scss']
})
export class CourierLoginComponent implements OnInit {

  errMsg!: string;

  loginForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl('')

  });


  constructor(
    private router: Router,
    private authService: AuthService,
    private localStore: LocalstoreService
  ) { }

  ngOnInit(): void {
  }


  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
    else {
      console.log("These are the forms", this.loginForm.value);
      const loginPayload: PostOfficeLoginPayload = {
        username: this.loginForm.value.emailAddress,
        password: this.loginForm.value.password,
        type: 'employee'
      }

      this.authService.postOfficeLogin(loginPayload).subscribe({
        next: (results) => {
          console.log("These are the results", results.token);
          if(results.token)
          {
            this.localStore.setData("token", results.token);
            this.localStore.setData("email", this.loginForm.value.emailAddress);
             this.router.navigateByUrl("trackstar/courier/deliveries");
          }
        },
        error: (err) => {
          console.log("This is the error", err);
          this.errMsg = "Username or password is incorrect. Try again"
        }
      })


    }
  }

  checkError(field: string): boolean | undefined {
    return this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched;
  }
}
