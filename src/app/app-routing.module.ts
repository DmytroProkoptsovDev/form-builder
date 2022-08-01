import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { NothingFoundComponent } from './components/nothing-found/nothing-found.component';
import { CanActivateLoginGuard } from './guards/can-activate-login.guard';
import { CanActivateRouteGuard } from './guards/can-activate-route.guard';
import { CanDeactivateRouteGuard } from './guards/can-deactivate-route.duard';
import { FormBuilderPage } from './modules/form-bilder/form-builder.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [CanActivateLoginGuard]
  },
  {
    path: 'home',
    component: FormBuilderPage,
    canActivate: [CanActivateRouteGuard],
    canDeactivate: [CanDeactivateRouteGuard]
  },
  { path: '**', component: NothingFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [CanActivateRouteGuard, CanDeactivateRouteGuard, CanActivateLoginGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
