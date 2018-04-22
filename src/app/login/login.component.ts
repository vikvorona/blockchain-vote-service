import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private fb: FormBuilder,
		public snackBar: MatSnackBar
	) {
		this.loginForm = this.fb.group({
			'username': ['', Validators.required],
			'password': ['', Validators.required]
		});
	}

	ngOnInit() {
		// reset login status
		this.authenticationService.logout();
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, '', {
			duration: 4000,
		});
	}


	submitForm() {
		this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
		.subscribe(result => {
			result === true ? this.router.navigate(['/voting']) : this.openSnackBar('Имя пользователя или пароль не верны');
		}
	);
}
}
