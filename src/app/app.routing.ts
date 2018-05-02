import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VotingComponent } from './voting/voting.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'voting',
		component: VotingComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'about',
		component: AboutComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
