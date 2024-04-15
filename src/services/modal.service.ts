import { Injectable } from '@angular/core';
import { VudModalService } from '@vismaux/ngx-vud';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: VudModalService) { }
  public showDialog(warningData?: any) {
    // const currentOptions = this._setOptions(warningData)
    this.modal
      .open(ModalComponent, {} as any, {
        size: 'xl',
        role: 'dialog',
        closeOnEscape: false,
        closeOnNavigation: false,
        closeOnOutsideClick: false
      }).afterClosed();
  }
}
