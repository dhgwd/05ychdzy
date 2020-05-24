import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  name$: Observable<string>;
  baseUrl = "http://localhost:8080/";

  constructor(private authService: AuthService, private fb: FormBuilder, private hc: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
  onSubmit(value: any) {
    console.log(value);
  }
  ngOnInit(): void {
  }

  login() {
    this.hc.post(this.baseUrl + 'account', this.myForm.value).subscribe((val: any) => {
      if (val.succ) {
        this.authService.login();
        this.router.navigate(['/management']);
      }
    })

  }
}