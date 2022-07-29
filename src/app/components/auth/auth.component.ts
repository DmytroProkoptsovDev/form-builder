import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      signup: new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        username: new FormControl(''),
      }),
      login: new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
      })
    })
  }

  onSubmit() {
    if(this.authForm.controls['login'].touched) {
      const user: User = this.authForm.controls['login'].value;
      this.authForm.controls['login'].reset();
      
      return;
    }
    if(this.authForm.controls['signup'].touched) {
      const newUser: User = this.authForm.controls['signup'].value;
      this.authForm.controls['signup'].reset();

      return;
    }
  }

}
