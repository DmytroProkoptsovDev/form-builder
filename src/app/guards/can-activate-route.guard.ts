import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
    
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isLoggedIn = this.auth.isAuthenticated();
        
        if(isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['']);
            
            return false;
        }
    }
}