import { Injectable } from "@angular/core";
import { CanDeactivate, UrlTree } from "@angular/router";
import { FormBuilderPage } from "../modules/form-bilder/form-builder.module";
import { AuthService } from "../services/auth/auth.service";


@Injectable()
export class CanDeactivateRouteGuard implements CanDeactivate<FormBuilderPage> {

    constructor(
        private auth: AuthService,
    ) {}

    canDeactivate(): boolean | UrlTree {
        const isLoggedOut = !this.auth.isAuthenticated();

        if(isLoggedOut) {
            return true;
        } else {
            return false;
        }
    }
}