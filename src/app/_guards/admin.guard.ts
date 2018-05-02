import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(private router: Router) { }

	static parseJwt(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	static isAdmin() {
		const currentUser = localStorage.getItem('currentUser'),
			curUserJson = currentUser && JSON.parse(currentUser),
			userToken = curUserJson && this.parseJwt(curUserJson.token),
			userPermissions = userToken && userToken.permissions;
		return userPermissions === 'admin';
	}

	canActivate() {
		if (AdminGuard.isAdmin()) {
			// logged in so return true
			return true;
		}

		// not logged in so redirect to login page
		this.router.navigate(['/login']);
		return false;
	}
}
