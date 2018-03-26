import {Component, Input, TemplateRef, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	exportAs: 'modal'
})
export class ModalComponent {
	@Input() title = '';
	@Input() onSave: Function;
	@Input() disabledSave = false;

	errorMsg = 'Невозможно сохранить';
	hideError = true;

	@ViewChild(TemplateRef) child: TemplateRef<any>;

	modalRef: any;

	constructor(private modalService: NgbModal) {}

	close() {
		this.modalRef.close();
	}

	save() {
		this.onSave().then(() => this.close(), (errorMsg) => {
			const error = errorMsg.json();
			const msg = error ? error.errorText : errorMsg.toString();
			this.showErrors(msg);
		});
	}

	open() {
		this.modalRef = this.modalService.open(this.child, {size: 'lg'});
	}

	showErrors(errorMsg) {
		this.errorMsg = errorMsg;
		this.hideError = false;
		setTimeout(() => {
			this.hideError = true;
		}, 5 * 1000);
	}
}
