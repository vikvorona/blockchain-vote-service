import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class PollService {
	headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
	options = new RequestOptions({ headers: this.headers });

	constructor(
		private http: Http,
		private authenticationService: AuthenticationService) {
	}

	createPoll(poll): Promise<any> {
		return this.http.put('http://localhost:3000/api/createPoll', {
			name: poll.name,
			answers: poll.answers
		}, this.options)
				.toPromise();
	}

	getPolls(): Promise<any> {
		return this.http.get('http://localhost:3000/api/polls')
				.toPromise().then((res: Response) => res.json());
	}

	vote(name, answer): Promise<any> {
		return this.http.post('http://localhost:3000/api/vote', {
			name: name,
			answer: answer
		})
		.toPromise().then((res: Response) => res.json());
	}
}
