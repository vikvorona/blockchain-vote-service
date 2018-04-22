import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
	public token: string;

	constructor(
		private router: Router,
		private http: Http
	) {
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;
	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post('http://localhost:3000/api/authenticate', { username: username, password: password })
			.map((response: Response) => {
				const token = response.json() && response.json().token;
				if (token) {
					this.token = token;

					localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token}));

					return true;
				} else {
					return false;
				}
			});
	}

	checkUser() {
		const headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
		const options = new RequestOptions({ headers: headers });
		return this.http.get('http://localhost:3000/api/checkUser', options).map((response: Response) => response.json().exists).toPromise();
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('currentUser');
		this.router.navigate(['/']);
	}
}
