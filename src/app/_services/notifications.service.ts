import { Injectable } from '@angular/core';
import { IUser } from '../_models/users.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationsService {

	constructor(
		private http: HttpClient
	) { }

	fetchUserNotifications(user: IUser): Observable<any> {
		if (!user) { return; }
		return this.http.get('http://localhost:3000/api/notifications', {
			params: {
				user: user.username
			}
		});
	}
}
