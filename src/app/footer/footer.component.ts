import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	githubURL = 'https://github.com/vikvorona/blockchain-vote-service';
	constructor() { }

	ngOnInit() {
	}

}
