import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { FormModule } from './form/form.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LoginComponent,
		FooterComponent,
		HeaderComponent,
		NavbarComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		FormModule,
		AppRoutingModule,
		NgbModule.forRoot()
	],
	providers: [AuthenticationService],
	bootstrap: [AppComponent]
})
export class AppModule { }
