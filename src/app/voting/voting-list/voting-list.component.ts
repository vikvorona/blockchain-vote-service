import { Component, OnInit, Output } from '@angular/core';
import { Voting, VotingListService } from '../../_services/voting-list.service';
import { PollService } from '../../_services/poll.service';
import { assignIn } from 'lodash';
import { IPoll } from '../../_models/poll.model';

@Component({
	selector: 'app-voting-list',
	templateUrl: './voting-list.component.html',
	styleUrls: ['./voting-list.component.scss']
})
export class VotingListComponent implements OnInit {

	constructor(private pollServise: PollService) { }

	public polls: Array<IPoll> = [];

	ngOnInit() {
		this.pollServise.getPolls().then((polls) => {
			this.polls = polls.map((poll) => ({
				name: poll.name,
				status: poll.status
			}));
		});
	}

}
