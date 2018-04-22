import { Component, OnInit, Input } from '@angular/core';
import { Voting } from '../../../_services/voting-list.service';

@Component({
	selector: 'app-voting-item',
	templateUrl: './voting-item.component.html',
	styleUrls: ['./voting-item.component.scss'],
})
export class VotingItemComponent implements OnInit {
	constructor() { }

	VOTING_STATUS = {
		finished: 'Завершено',
		onprogress: 'В процессе'
	};

	private _voting: Voting;

	@Input()
	set voting(voting: Voting) {
		this._voting = voting;
	}

	get voting(): Voting { return this._voting; }

	public statusClasses;
	public statusIconClasses;
	public state;
	public isFinished;

	ngOnInit() {
		this.state = this._voting.status === 'finished' ? 'inactive' : 'active';
		this.isFinished = this._voting.status === 'finished';
	}

}
