import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { PollService } from '../_services/poll.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	usersCount: number;
	pollsCount: number;

	constructor(
		private userServiece: UserService,
		private pollsService: PollService
	) {
		this.userServiece.getUsers().subscribe((users) => this.usersCount = users.length);
		this.pollsService.getPolls().subscribe((polls) => this.pollsCount = polls.length);
	}

	ngOnInit() {
	}

}
