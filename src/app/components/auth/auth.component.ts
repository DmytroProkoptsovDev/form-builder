import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoggedInUserName } from './auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public authForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) { }

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if(this.authForm.controls['login'].touched) {
      const user: User = this.authForm.controls['login'].value;
      this.authForm.controls['login'].reset();
      
      this.authService.login(user)
        .pipe(
          takeUntil(this.destroy$)
          )
        .subscribe((response) => {
          if(this.authService.isAuthenticated()) {
            const { username } = response?.user;

            this.store.dispatch(setLoggedInUserName({ userName: username ?? '' }))
            this.redirect();
          }
        });
      
      return;
    }
    if(this.authForm.controls['signup'].touched) {
      const newUser: User = this.authForm.controls['signup'].value;
      this.authForm.controls['signup'].reset();

      this.authService.signup(newUser)
        .pipe(
          takeUntil(this.destroy$)
          )
        .subscribe((response: any) => {
          if(this.authService.isAuthenticated()) {
            const { username } = response?.user;

            this.store.dispatch(setLoggedInUserName({ userName: username }))
            this.redirect();
          }
        });

      return;
    }
  }

  redirect() {
    this.router.navigate(['/home']);
  }
}
