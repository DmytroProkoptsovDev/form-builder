import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth/auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable()
export class AuthEffects {
    login$: any = createEffect(() =>
        this.actions$.pipe())

    constructor(
        private actions$: Actions,
        private auth: AuthService
    ) {}
}