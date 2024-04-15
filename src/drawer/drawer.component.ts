import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VudDrawerComponent, VudDrawerModule, VudDrawerRef, VudErrorTooltipModule, VudIconModule, VudSelectModule, VudSpinnerModule } from '@vismaux/ngx-vud';
import { FormsModule } from '@angular/forms';
import { SubSink } from 'subsink';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EmitterService } from '@ngxs-labs/emitter';
import { DrawerStore } from './store/drawer-store';
import { IDrawerState } from './store/drawer-state';

@Component({
  selector: 'ngg-drawer',
  standalone: true,
  imports: [
    FormsModule,
    VudSelectModule,
    VudIconModule,
    VudErrorTooltipModule,
    VudDrawerModule,
    CommonModule,
    VudSpinnerModule
  ],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent extends VudDrawerComponent implements OnDestroy, OnInit {

  public _subs = new SubSink();
  public drawerStore$ = new Observable<any>();
  public drawerInputValue="";
  public items=['item1','item2','item3'];
  constructor(private modalRef: VudDrawerRef<DrawerComponent>,
    private store: Store,
    private emitter: EmitterService) {
    super();
    this.drawerStore$ = this.store.select(DrawerStore.getDrawerState);

  }

  public ngOnInit(): void {
    this._subs.add(this.drawerStore$.subscribe((state: IDrawerState) => {
        this.drawerInputValue= state.data.drawerInputValue;
    }));
  }

  public closeDrawer() {
    this.modalRef.close();
  }

  public onChangeDrawerInputValue(event: any) {
    this.emitter.action<string>(DrawerStore.updateDrawerInputValue).emit(event);
  }
  public onChangeSelect(event: any){

  }


  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
