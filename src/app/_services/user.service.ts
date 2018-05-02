import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/users.model';

@Injectable()
export class UserService {
	headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
	options = { headers: this.headers };

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService) {
	}

	createUser(user): Promise<any> {
		return this.http.put('http://localhost:3000/api/createUser', {
			username: user.username,
			password: user.password,
			firstname: user.firstname,
			lastname: user.lastname
		}, this.options)
				.toPromise();
	}

	changePassword(user, password): Promise<any> {
		return this.http.put('http://localhost:3000/api/changePassword', { username: user.username, password: password }, this.options)
				.toPromise();
	}

	deleteUser(user): Promise<any> {
		return this.http.delete('http://localhost:3000/api/deleteUser?username=' + user.username, this.options)
				.toPromise();
	}

	getUsers(): Promise<any> {
		return this.http.get('http://localhost:3000/api/users', this.options)
			.toPromise();
	}

	getUser(): User {
		return JSON.parse(localStorage.getItem('currentUser'));
	}
}
