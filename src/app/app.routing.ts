import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},

	// otherwise redirect to home
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
