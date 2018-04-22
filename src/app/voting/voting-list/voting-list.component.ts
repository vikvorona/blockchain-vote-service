import { Component, OnInit, Output } from '@angular/core';
import { Voting, VotingListService } from '../../_services/voting-list.service';

@Component({
	selector: 'app-voting-list',
	templateUrl: './voting-list.component.html',
	styleUrls: ['./voting-list.component.scss']
})
export class VotingListComponent implements OnInit {

	constructor(private votingListService: VotingListService) { }


	public votings: Voting[];

	ngOnInit() {
		this.votings = this.votingListService.getVotings();
	}

}
