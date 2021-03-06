import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { FormComponent } from './form.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminGuard } from '../_guards/admin.guard';
import { UserService } from '../_services/user.service';
import { FormRoutingModule } from './form-routing.module';
import { AuthenticationService } from '../_services/authentication.service';


@NgModule({
	declarations: [
		FormComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		FormRoutingModule
	],
	providers: [AuthGuard, UserService, AuthenticationService, AdminGuard]
})
export class FormModule { }
