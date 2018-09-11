
//Router
import { RouterModule, Routes } from '@angular/router';
//Components
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { QuestionsComponent } from './questions/questions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export const appRoutes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
    { path: 'questions', component: QuestionsComponent , canActivate: [AuthGuard]},
    { path: 'leaderboard', component: LeaderboardComponent , canActivate: [AuthGuard]},
    { path: 'settings', component: SettingsComponent , canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent }
];