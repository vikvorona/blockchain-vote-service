import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../../../utils';
import { PollService } from '../../../_services/poll.service';
import { IPoll } from '../../../_models/poll.model';
import { assignIn } from 'lodash';
import { POLL_STATUSES, POLL_STATUSES_NAMES } from '../../../_constants/poll.constants';

@Component({
	selector: 'app-voting-item',
	templateUrl: './voting-item.component.html',
	styleUrls: ['./voting-item.component.scss'],
})
export class VotingItemComponent implements OnInit {
	constructor(private pollService: PollService) { }

	POLL_STATUSES = POLL_STATUSES;
	POLL_STATUSES_NAMES = POLL_STATUSES_NAMES;

	@Input('voting') voting: IPoll;

	public state;
	public isFinished;
	public poll;

	ngOnInit() {
		this.state = this.voting.status === this.POLL_STATUSES.finished ? 'inactive' : 'active';
		this.isFinished = this.voting.status === this.POLL_STATUSES.finished;
	}

	getPoll() {
		this.pollService.getPoll(this.voting.name).then((poll) => this.poll = assignIn(new Poll(), poll));
	}

	vote(answer: string) {
		this.pollService.vote(this.voting.name, answer);
	}

}
