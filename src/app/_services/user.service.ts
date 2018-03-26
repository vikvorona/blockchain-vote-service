import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
	headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
	options = new RequestOptions({ headers: this.headers });

	constructor(
		private http: Http,
		private authenticationService: AuthenticationService) {
	}

	createUser(user): Promise<any> {
		return this.http.put('http://localhost:3000/api/createUser', {
			username: user.username,
			password: user.password,
			address: user.address,
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

	getUsers() {
		return this.http.get('http://localhost:3000/api/users', this.options)
				.toPromise().then((res: Response) => res.json());
	}
}
