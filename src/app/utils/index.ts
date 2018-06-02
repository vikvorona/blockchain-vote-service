export class Poll {
	public name: string;
	public status = 'active';

	private _answers: Array<Answer> = [];

	set answers(array: Array<any>) {
		array.forEach((item) => {
			this._answers.push(new Answer(item[0], item[1]));
		});
	}

	get answers() {
		return this._answers;
	}

	getPercent(index) {
		let lol = 0;
		this.answers.forEach(ans => {
			lol += ans.count;
		});
		return (this.answers[index].count / lol) * 100;
	}
}

export class Answer {
	answer: string;
	count: number;

	constructor(answer: string, count: string) {
		this.answer = answer;
		this.count = +count;
	}
}
