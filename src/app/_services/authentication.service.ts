import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Poll } from '../utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
	public token: string;
	private currentUser: any;
	public isLoggedIn$ = new BehaviorSubject<boolean>(null);

	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = this.currentUser && this.currentUser.token;
		this.isLoggedIn$.next(false);
		this.checkUser().then(exists => {
			if (exists) {
				this.isLoggedIn$.next(true);
			}
		});
	}

	getLoggedInSubject(): Observable<boolean> {
		return this.isLoggedIn$.asObservable();
	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post('http://localhost:3000/api/authenticate', { username: username, password: password })
			.map((response: any) => {
				const token = response && response.token;
				if (token) {
					this.token = token;
					this.isLoggedIn$.next(true);
					localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token}));
					return true;
				} else {
					return false;
				}
			});
	}

	checkUser() {
		const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
		const options = { headers };
		return this.http.get('http://localhost:3000/api/checkUser', options).map((response: any) => response.exists).toPromise();
	}

	logout(): void {
		this.isLoggedIn$.next(false);
		this.token = null;
		localStorage.removeItem('currentUser');
		this.router.navigate(['/login']);
	}
}
