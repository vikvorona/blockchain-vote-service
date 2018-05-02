import { NgModule } from '@angular/core';

import {
	MatButtonModule,
	MatMenuModule,
	MatInputModule,
	MatToolbarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatCardModule,
	MatListModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatSnackBarModule
} from '@angular/material';

@NgModule({
	imports: [
		MatButtonModule,
		MatProgressSpinnerModule,
		MatMenuModule,
		MatInputModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatSnackBarModule
	],
	exports: [
		MatButtonModule,
		MatProgressSpinnerModule,
		MatMenuModule,
		MatInputModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatListModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatSnackBarModule
	]
})
export class MaterialModule {}
