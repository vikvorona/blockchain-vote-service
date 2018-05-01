import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { NotificationsService } from '../_services/notifications.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	isLoggedIn: boolean;
	isNotificationsDisabled: boolean;
	notifications: any;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private notificationService: NotificationsService,
		private userService: UserService
	) {
		this.isNotificationsDisabled = localStorage.getItem('isNotificationsDisabled') === 'true';
	}

	ngOnInit() {
		this.authenticationService.getLoggedInSubject().subscribe((isLoggedIn) => this.isLoggedIn = isLoggedIn);
		this.notifications = this.notificationService.fetchUserNotifications(this.userService.getUser());
	}

	toggleNotifications() {
		this.isNotificationsDisabled = !this.isNotificationsDisabled;
		localStorage.setItem('isNotificationsDisabled', this.isNotificationsDisabled.toString());
	}

	login() {
		this.router.navigate(['/login']);
	}

	logout() {
		this.authenticationService.logout();
	}

}
