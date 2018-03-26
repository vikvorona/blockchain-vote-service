import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	constructor() { }

	isNavbarCollapsed = true;

	ngOnInit() {
	}

	toggleNavbar(): void {
		if (this.isNavbarCollapsed) {
			this.isNavbarCollapsed = false;
		} else {
			this.isNavbarCollapsed = true;
		}
	}

}
