import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { VudButtonModule, VudDrawerService, VudIconModule, VudModalService, VudSelectComponent, VudSelectModule } from '@vismaux/ngx-vud';
import 'zone.js';
import { ModalService } from './services/modal.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DrawerService } from './services/drawer.service';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AppStore } from './app-store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { ModalStore } from './modal/store/modal-store';
import { DrawerStore } from './drawer/store/drawer-store';

import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    VudSelectModule,
    VudButtonModule
  ],
  template: `
    <div class="bg-default container">
    <h1>Hello from {{ name }}!</h1>
    <button vudButton (click)="openModal()"> Add new</button>
    <vud-select [items]="items" labelForId="basic-select" placeholder="Start typing.."></vud-select>
    </div>
  `,
})
export class App {
  name = 'Angular';
  items=['item1','item2','item3'];
  constructor(
    private modalService:ModalService){

  }

  public openModal(){
    this.modalService.showDialog()
  }
}

// bootstrapApplication(App);

bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    VudModalService,
    VudDrawerService,
    ModalService,
    DrawerService,
    importProvidersFrom(
      NgxsModule.forRoot([AppStore], {
        compatibility: {
          strictContentSecurityPolicy: true
        }
      }),
      NgxsModule.forFeature([ModalStore,DrawerStore]),
      NgxsEmitPluginModule.forRoot(),
      NgxsRouterPluginModule.forRoot(),
      // note: Devtools should always be the last by order of all NGXS plugins.
      NgxsReduxDevtoolsPluginModule.forRoot({
      })
      
    )
  ]
})

