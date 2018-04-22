import { NgModule } from '@angular/core';

import {
	MatButtonModule,
	MatMenuModule,
	MatInputModule,
	MatToolbarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatCardModule,
	MatListModule
} from '@angular/material';

@NgModule({
	imports: [
		MatButtonModule,
		MatProgressSpinnerModule,
		MatMenuModule,
		MatInputModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule
	],
	exports: [
		MatButtonModule,
		MatProgressSpinnerModule,
		MatMenuModule,
		MatInputModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatListModule
	]
})
export class MaterialModule {}
