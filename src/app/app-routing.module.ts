import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YourComputerComponent } from './your-computer/your-computer.component';
import { AuthGuard } from './authGuard';

const routes: Routes = [
  { path: '', redirectTo: '/user-pages/login', pathMatch: 'full' },
  { path: 'your-computer', component: YourComputerComponent, canActivate:[AuthGuard] },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule)},
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: '**', redirectTo: "/user-pages/login" },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
