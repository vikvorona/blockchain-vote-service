import { Injectable } from '@angular/core';

export interface Voting {
	name: string;
	description: string;
	status: string;
	votes: number;
	answers: string[];
}

@Injectable()
export class VotingListService {
	getVotings(): Voting[] {
		const votings: Voting[] = [
			{
				name: 'Выборы президента РФ',
				description: 'Президент desc',
				status: 'onprogress',
				votes: 700,
				answers: ['Навальный', 'Путин', 'Собчак', 'Жириновский']
			},
			{
				name: 'Выборы президента РФ',
				description: 'Президент desc',
				status: 'onprogress',
				votes: 900,
				answers: ['Навальный1', 'Путин1', 'Собчак1', 'Жириновский1']
			}
		];

		return votings;
	}
}
