import { Component, OnInit, Output } from '@angular/core';
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
		this.pollServise.getPolls().subscribe((polls) => {
			this.polls = polls;
		});
	}

}
