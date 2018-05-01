import { Component } from '@angular/core';
import * as Web3 from 'web3';
import { Router } from '@angular/router';
import { PollService } from '../_services/poll.service';
import { User } from '../utils';
import { UserService } from '../_services/user.service';


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss', '../app.component.scss']
})
export class FormComponent {

	subject: string;
	user = new User();
	answers: Array<string> = ['a'];

	constructor(private pollService: PollService, private userService: UserService) {
	}

	customTrackBy(index: number, obj: any): any {
		return index;
	}

	addSubject() {
		this.pollService.createPoll({
			name: this.subject,
			answers: this.answers
		});
	}

	canAdd() {
		return this.answers.every((answer) => !!answer) && this.subject;
	}

	addUser() {
		this.userService.createUser(this.user);
	}

	canAddUser() {
		return this.user.firstname && this.user.lastname && this.user.username && this.user.password;
	}
}
