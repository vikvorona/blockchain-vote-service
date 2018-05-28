import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { USER_PERMISSIONS } from '../_constants/permissions.constants';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(private router: Router) { }

	static parseJwt(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	static isAdmin(): boolean {
		const currentUser = localStorage.getItem('currentUser'),
					curUserJson = currentUser && JSON.parse(currentUser),
					userToken = curUserJson && this.parseJwt(curUserJson.token),
					userPermissions = userToken && userToken.permissions;
		return userPermissions === USER_PERMISSIONS.admin;
	}

	canActivate() {
		if (AdminGuard.isAdmin()) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
