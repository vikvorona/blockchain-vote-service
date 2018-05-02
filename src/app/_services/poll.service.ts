import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PollService {
	headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
	options = { headers: this.headers };

	constructor(
		private http: HttpClient,
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
				.toPromise();
	}

	getPoll(name): Observable<any> {
		const poll = new WebSocket(`ws://localhost:3000/api/poll?name=${name}`);
		const subj$ = new BehaviorSubject(null);
		poll.onmessage = (event) => {
			subj$.next(event.data);
		};
		return subj$.asObservable();
	}

	vote(name, answer): Promise<any> {
		return this.http.post('http://localhost:3000/api/vote', {
			name: name,
			answer: answer
		}, this.options)
		.toPromise();
	}
}
