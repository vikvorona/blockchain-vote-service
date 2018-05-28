import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Poll } from '../utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
	public token: string;
	public isLoggedIn$ = new BehaviorSubject<boolean>(null);

	private currentUser: any;

	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = this.currentUser && this.currentUser.token;
		this.isLoggedIn$.next(false);
		this.checkUser().subscribe(exists => {
			if (exists) {
				this.isLoggedIn$.next(true);
			}
		});
	}

	getLoggedInSubject(): Observable<boolean> {
		return this.isLoggedIn$.asObservable();
	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post(environment.API_URL + '/authenticate', { username: username, password: password })
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

	checkUser(): Observable<boolean> {
		const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
		const options = { headers };
		return this.http.get(environment.API_URL + '/checkUser', options)
			.map((response: any) => response.exists);
	}

	logout(): void {
		this.isLoggedIn$.next(false);
		this.token = null;
		localStorage.removeItem('currentUser');
		this.router.navigate(['/login']);
	}
}
