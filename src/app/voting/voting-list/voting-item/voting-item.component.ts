import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../../../utils';
import { PollService } from '../../../_services/poll.service';

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

	@Input('voting') voting: Poll;

	public state;
	public isFinished;

	ngOnInit() {
		this.state = this.voting.status === 'finished' ? 'inactive' : 'active';
		this.isFinished = this.voting.status === 'finished';
	}

	vote(answer: string) {
		this.pollService.vote(this.voting.name, answer);
	}

}
