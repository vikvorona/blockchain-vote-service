import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/users.model';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
	usersData: User[];
	dataSource: any;
	isFilteredData: boolean;
	isUsersExists: boolean;
	displayedColumns = ['username', 'firstname', 'lastname'];


	constructor(private userService: UserService) {
		this.isUsersExists = false;
		this.isFilteredData = true;
	}

	ngOnInit() {
		this.userService.getUsers().then((users) => {
			this.usersData = users;
			this.dataSource = new MatTableDataSource(this.usersData);
			this.isUsersExists = this.usersData.length ? true : false;
		});
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
		this.isFilteredData = this.dataSource.filteredData.length ? true : false;
	}
}
