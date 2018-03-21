import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { FormComponent } from './form/form.component';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: FormComponent, canActivate: [AuthGuard] },

	// otherwise redirect to home
	{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
