import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { IUser } from '../_models/users.model';

@Injectable()
export class UserService {
	headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
	options = { headers: this.headers };

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService) {
	}

	createUser(user): Observable<any> {
		return this.http.put(environment.API_URL + '/createUser', {
			username: user.username,
			password: user.password,
			firstname: user.firstname,
			lastname: user.lastname
		}, this.options);
	}

	changePassword(user, password): Observable<any> {
		return this.http.put(environment.API_URL + '/changePassword', { username: user.username, password: password }, this.options);
	}

	deleteUser(user): Observable<any> {
		return this.http.delete(environment.API_URL + '/deleteUser?username=' + user.username, this.options);
	}

	getUsers(): Observable<IUser[]> {
		return this.http.get(environment.API_URL + '/users', this.options)
			.map((users) => <IUser[]>users);
	}

	getUser(): IUser {
		return JSON.parse(localStorage.getItem('currentUser'));
	}
}
