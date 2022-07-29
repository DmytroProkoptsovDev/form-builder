import { NgModule } from "@angular/core";
import { AuthComponent } from "src/app/components/auth/auth.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { LoginRoutingModule } from "./login-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        MatTabsModule, MatInputModule,
        MatFormFieldModule, LoginRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [ AuthComponent ],
})
export class LoginModule { }