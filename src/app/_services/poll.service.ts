import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IPoll } from '../_models/poll.model';

@Injectable()
export class PollService {
	headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
	options = { headers: this.headers };

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService) {
	}

	createPoll(poll): Observable<any> {
		return this.http.put(environment.API_URL + '/createPoll', {
			name: poll.name,
			answers: poll.answers
		}, this.options);
	}

	getPolls(): Observable<IPoll[]> {
		return this.http.get(environment.API_URL + '/polls')
			.map((polls) => <IPoll[]>polls);
	}

	getPoll(name): Observable<any> {
		const poll = new WebSocket(environment.API_URL_WS + `/poll?name=${name}`);
		const subj$ = new BehaviorSubject(null);
		poll.onmessage = (event) => {
			subj$.next(event.data);
		};
		return subj$.asObservable();
	}

	vote(name, answer): Observable<any> {
		return this.http.post( environment.API_URL + '/vote', { name, answer }, this.options);
	}
}
