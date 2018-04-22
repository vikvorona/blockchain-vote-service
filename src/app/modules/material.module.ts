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
		MatSnackBarModule
	]
})
export class MaterialModule {}
