import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { VudButtonModule, VudDrawerService, VudIconModule, VudModalService } from '@vismaux/ngx-vud';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    VudButtonModule
  ],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <button vudButton (click)="openModal()"> Add new</button>
  `,
})
export class App {
  name = 'Angular';
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
    // provideAnimations(),
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
function provideAnimations(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

