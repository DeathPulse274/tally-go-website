import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './user-pages/login/login.component';


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },

    { path: "login", component: LoginComponent },
    { path: '**', redirectTo: "/login" },

    // { path : 'main-page', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }