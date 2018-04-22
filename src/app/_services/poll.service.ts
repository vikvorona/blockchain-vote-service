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
			address: poll.address
		}, this.options)
				.toPromise();
	}

	getPolls() {
		return this.http.get('http://localhost:3000/api/polls')
				.toPromise().then((res: Response) => res.json());
	}
}
