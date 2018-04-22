import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	isNotificationsDisabled: boolean;

	constructor(
		private authenticationService: AuthenticationService
	) {
		this.isNotificationsDisabled = false;
	}

	ngOnInit() {
	}

	toggleNotifications() {
		this.isNotificationsDisabled = !this.isNotificationsDisabled;
	}

	logout() {
		this.authenticationService.logout();
	}

}
