import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderPage } from './modules/form-bilder/form-builder.module';

const routes: Routes = [
  { path: 'form-builder', component: FormBuilderPage},
  { path: '', loadChildren: () => import('./modules/login/login.module').then(l => l.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
