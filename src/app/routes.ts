
//Router
import { RouterModule, Routes } from '@angular/router';
//Components
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent }
];