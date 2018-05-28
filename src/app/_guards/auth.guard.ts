import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private authenticationService: AuthenticationService) { }

	canActivate() {
		return this.authenticationService.checkUser().map(exists => {
			if (!exists) {
				this.router.navigate(['/login']);
			}
			return exists;
		});
	}
}
