import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VotingComponent } from './voting/voting.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
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

	// otherwise redirect to home
	{
		path: '**',
		redirectTo: '/voting'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
