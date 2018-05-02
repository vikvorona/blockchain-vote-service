import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../../../utils';
import { PollService } from '../../../_services/poll.service';
import { IPoll } from '../../../_models/poll.model';
import { assignIn } from 'lodash';

@Component({
	selector: 'app-voting-item',
	templateUrl: './voting-item.component.html',
	styleUrls: ['./voting-item.component.scss'],
})
export class VotingItemComponent implements OnInit {
	constructor(private pollService: PollService) { }

	VOTING_STATUS = {
		finished: 'Завершено',
		active: 'В процессе'
	};

	@Input('voting') voting: IPoll;

	public state;
	public isFinished;
	public poll: Poll;
	public open = false;

	ngOnInit() {
		this.state = this.voting.status === 'finished' ? 'inactive' : 'active';
		this.isFinished = this.voting.status === 'finished';
	}

	getPoll() {
		if (!this.open) {
			this.pollService.getPoll(this.voting.name).subscribe((poll) => {
				if (poll) {
					const parsedPoll = JSON.parse(poll);
					if (parsedPoll.address) {
						this.poll = assignIn(new Poll(), parsedPoll);
					} else {
						this.poll.answers[parsedPoll.index].count = parsedPoll.answer[1];
					}
				}
			});
			this.open = true;
		}
	}

	vote(answer: string) {
		this.pollService.vote(this.voting.name, answer);
	}

}
