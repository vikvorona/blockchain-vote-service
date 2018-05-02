import { Injectable } from '@angular/core';
import { User } from '../_models/users.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

	constructor(
		private http: HttpClient
	) { }

	fetchUserNotifications(user: User) {
		if (!user) { return; }
		return this.http.get('http://localhost:3000/api/notifications', {
			params: {
				user: user.username
			}
		});
	}
}
