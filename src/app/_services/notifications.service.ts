import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../_models/users.model';

@Injectable()
export class NotificationsService {

	constructor(
		private http: Http
	) { }

	fetchUserNotifications(user: User) {
		return this.http.get('http://localhost:3000/api/notifications', {
			params: `user=${user.username}`
		});
	}
}
