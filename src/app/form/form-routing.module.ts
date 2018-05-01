import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminGuard } from '../_guards/admin.guard';

export const mainRoutes: Routes = [
	{
		path: 'asd',
		component: FormComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(mainRoutes)],
	exports: [RouterModule]
})
export class FormRoutingModule { }
