import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class CanActivateLoginGuard implements CanActivate {
    
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isLoggedIn = this.auth.isAuthenticated();
        
        if(!isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/home']);

            return false;
        }
    }
}