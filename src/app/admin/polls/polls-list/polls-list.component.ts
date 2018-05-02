import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IPoll } from '../../../_models/poll.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PollService } from '../../../_services/poll.service';
import { POLL_STATUSES, POLL_STATUSES_NAMES } from '../../../_constants/poll.constants';

@Component({
	selector: 'app-polls-list',
	templateUrl: './polls-list.component.html',
	styleUrls: ['./polls-list.component.scss']
})
export class PollsListComponent implements OnInit {
	pollsData: IPoll[];
	dataSource: any;
	isPollsExists: boolean;
	isFilteredData: boolean;
	displayedColumns = ['name', 'startdate', 'status'];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private pollService: PollService) {
		this.dataSource = new MatTableDataSource();
		this.isPollsExists = false;
		this.isFilteredData = true;
	}

	ngOnInit() {


		this.pollService.getPolls().then((polls) => {
			this.pollsData = polls.map((poll) => {
				switch (poll.status) {
					case POLL_STATUSES.active:
					poll.status = POLL_STATUSES_NAMES.active;
					break;
					case POLL_STATUSES.finished:
					poll.status = POLL_STATUSES_NAMES.finished;
					break;
				}

				poll.startDate = new Date(poll.startDate).toLocaleDateString();
				return poll;
			});
			this.dataSource.data = this.pollsData;
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.isPollsExists = this.pollsData.length ? true : false;
		});
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
		this.isFilteredData = this.dataSource.filteredData.length ? true : false;
	}
}
