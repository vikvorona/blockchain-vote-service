import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';



import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { VotingListService } from './_services/voting-list.service';
import { FormModule } from './form/form.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { VotingComponent } from './voting/voting.component';
import { AboutComponent } from './about/about.component';
import { VotingListComponent } from './voting/voting-list/voting-list.component';
import { VotingItemComponent } from './voting/voting-list/voting-item/voting-item.component';
import { VotingFilterComponent } from './voting/voting-list/voting-filter/voting-filter.component';
import { VotingAnswerComponent } from './voting/voting-list/voting-item/voting-answer/voting-answer.component';
import { PollService } from './_services/poll.service';
import { HomeComponent } from './home/home.component';
import { NotificationsService } from './_services/notifications.service';
import { AdminComponent } from './admin/admin.component';
import { UsersListComponent } from './admin/users/users-list/users-list.component';
import { PollsListComponent } from './admin/polls/polls-list/polls-list.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LoginComponent,
		FooterComponent,
		HeaderComponent,
		VotingComponent,
		AboutComponent,
		VotingListComponent,
		VotingItemComponent,
		VotingFilterComponent,
		VotingAnswerComponent,
		HomeComponent,
		AdminComponent,
		UsersListComponent,
		PollsListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule,
		NgProgressModule.forRoot({
			color: '#ff4081'
		}),
		NgProgressHttpModule
	],
	providers: [
		AuthenticationService,
		VotingListService,
		PollService,
		NotificationsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
