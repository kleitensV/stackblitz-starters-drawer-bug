import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VudCheckboxModule, VudErrorTooltipModule, VudIconModule, VudModalComponent, VudModalRef, VudModalService, VudRadioModule, VudSelectModule, VudSpinnerModule, VudTabsetModule } from '@vismaux/ngx-vud';
import { FormsModule } from '@angular/forms';
import { SubSink } from 'subsink';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, first, last } from 'rxjs';
import { EmitterService } from '@ngxs-labs/emitter';

import { IModalState } from './store/modal-state';
import { ModalStore } from './store/modal-store';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'ngg-modal',
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
  templateUrl: './modal.component.html',
})

export class ModalComponent extends VudModalComponent<ModalComponent> implements OnInit {

  private _subs = new SubSink();
  public modalState$: Observable<IModalState>;
  public modalInputValue='';

  constructor(private modalRef: VudModalRef<ModalComponent>,
    private store: Store,
    private drawerService:DrawerService,
    private emitter: EmitterService,
    private modal: VudModalService) {
    super();
    this.modalState$ = this.store.select(ModalStore.getModalState);
  }

  public ngOnInit(): void {
    this._subs.add(this.modalState$.subscribe((state: IModalState) => {
        this.modalInputValue=state.data.modalInputValue;
    }));
  }

  public onChangeName(event: any) {
    this.emitter.action<string>(ModalStore.updateModalInputValue).emit(event);
  }

  public onOpenDrawer(){
    this.drawerService.showDrawer()
  }

  public onCloseDialog(event: any) {
    this.modalRef.close();
  }

}
