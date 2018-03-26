import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormComponent } from './form.component';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminGuard } from '../_guards/admin.guard';
import { UserService } from '../_services/user.service';
import { FormRoutingModule } from './form-routing.module';
import { AuthenticationService } from '../_services/authentication.service';
import { ModalComponent } from '../modal/modal.component';


@NgModule({
	declarations: [
		FormComponent,
		ModalComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		FormRoutingModule,
		NgbModule
	],
	providers: [AuthGuard, UserService, AuthenticationService, AdminGuard]
})
export class FormModule { }
