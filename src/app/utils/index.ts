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
}

export class Answer {
	answer: string;
	count: number;

	constructor(answer: string, count: string) {
		this.answer = answer;
		this.count = +count;
	}
}
