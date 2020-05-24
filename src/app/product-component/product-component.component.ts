import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user-management-component/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  fs: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'fs': [''],
      'id': [''],
    })
    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.fs = this.myForm.controls['fs'];
  }
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'abc');
  }

  search() {
    if (this.id.value) {
      console.log(this.id.value);
      this.users$ =
        <Observable<User>>this.httpClient.get(this.baseUrl + 'abc/' +
          this.id.value);

    } else {
      this.users$ =
        <Observable<User>>this.httpClient.get(this.baseUrl + 'abc');
    }
  }



  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'abc',
      this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('添加成功!');
          }
        }
      );
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'abc/' +
        this.currentUser.id).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('删除成功!');
            }
          }
        )
    }

  }

  updata() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'abc',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('修改成功!');
            }
          }
        )
    }

  }

}

