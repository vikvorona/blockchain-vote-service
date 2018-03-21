import { Component } from '@angular/core';
import * as Web3 from 'web3';
import { Router } from '@angular/router';


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss', '../app.component.scss']
})
export class FormComponent {

	vote: string;
	votes: Array<string> = ['first', 'second'];
	voteCounts: Array<number> = [];
	subject: string;
	web3 = new Web3(new Web3.providers.HttpProvider('http: //localhost: 8008'));
	contactAbi = this.web3.eth.contract([
		{'constant': false,
			'inputs': [{'name': 'name', 'type': 'string'}], 'name': 'addName',
			'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'},
		{'constant': true,
			'inputs': [{'name': '', 'type': 'uint256'}], 'name': 'arrayCount',
			'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'},
		{'constant': true,
			'inputs': [], 'name': 'getCount',
			'outputs': [{'name': '', 'type': 'uint256[]'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'},
		{'constant': true,
			'inputs': [{'name': '', 'type': 'uint256'}], 'name': 'arrayNames',
			'outputs': [{'name': '', 'type': 'string'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'},
		{'constant': false,
			'inputs': [{'name': 'name', 'type': 'string'}], 'name': 'vote',
			'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}]);
	voteContract = this.contactAbi.at('0xfcad216379b18c56bacbb3c0514618daf7912392');

	constructor(private router: Router) {
		console.log(this.voteContract);
		this.web3.eth.defaultAccount = '0x56604266fc19aae07c1ff968eaca81ae20ebe492';
	}

	countVoices() {
		const voteCounts = this.voteContract.getCount();
		voteCounts.forEach((count, i) => {
			this.voteCounts[i] = count.c[0];
		});
	}

	addSubject() {
		this.votes.push(this.subject);
		this.voteContract.addName(this.subject);
		this.voteCounts.length = this.votes.length;
		this.subject = null;
	}

	addVote() {
		this.voteContract.vote(this.vote);
		this.countVoices();
		this.vote = null;
	}

	logout(): void {
		localStorage.removeItem('currentUser');
		this.router.navigate(['/login']);
	}
}
