import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
    
    constructor(public auth: AuthService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(event => {
                if(event instanceof HttpResponse) {
                    const token = event?.body?.accessToken;
                    const key = this.auth.tokenStorageKey;

                    if(token) {
                        window.localStorage.setItem(key, JSON.stringify(token));
                    }
                }
            }
            )
        );
    }
}