import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	hasErrors: boolean;
	loading: boolean;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private fb: FormBuilder
	) {
		this.hasErrors = false;
		this.loading = false;
		this.loginForm = this.fb.group({
			'username': ['', Validators.required],
			'password': ['', Validators.required]
		});
	}

	ngOnInit() {
		// reset login status
		this.authenticationService.logout();
	}


	submitForm() {
		this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
			.subscribe(result => {
				result === true ? setTimeout( () => this.router.navigate(['/voting']), 2000) : this.hasErrors = true;
				this.loading = true;
			}
		);
	}
}
