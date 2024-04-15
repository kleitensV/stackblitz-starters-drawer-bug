import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VudCheckboxModule, VudErrorTooltipModule, VudIconModule, VudModalComponent, VudModalRef, VudModalService, VudRadioModule, VudSelectModule, VudSpinnerModule, VudTabsetModule } from '@vismaux/ngx-vud';
import { FormsModule } from '@angular/forms';
import { SubSink } from 'subsink';
import { Store } from '@ngxs/store';
import { Observable, first, last } from 'rxjs';
import { EmitterService } from '@ngxs-labs/emitter';

import { IModalState } from './store/modal-state';
import { ModalStore } from './store/modal-store';

@Component({
  selector: 'ng4-group-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    VudIconModule,
    VudSelectModule,
    VudTabsetModule,
    VudRadioModule,
    VudCheckboxModule,
    VudErrorTooltipModule,
    VudSpinnerModule
  ],
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})

export class GroupModalComponent extends VudModalComponent<GroupModalComponent> implements OnInit {

  private _subs = new SubSink();
  public modalState$: Observable<IModalState>;

  constructor(private modalRef: VudModalRef<GroupModalComponent>,
    private store: Store,
    private emitter: EmitterService,
    private modal: VudModalService) {
    super();
    this.modalState$ = this.store.select(ModalStore.getModalState);
  }

  public ngOnInit(): void {
    this._subs.add(this.modalState$.subscribe((selectedGroup: IModalState) => {
    }));
  }

  public onChangeName(event: any) {
    // let dynamicItem = {
    //   key: "groupName",
    //   value: event
    // } as GenericFormDataItem;
    // this.emitter.action<GenericFormDataItem>(FGroupModalStore.updateModalGroup).emit(dynamicItem);
  }


  public onCloseDialog(event: any) {
    this.modalRef.close();
  }

}
