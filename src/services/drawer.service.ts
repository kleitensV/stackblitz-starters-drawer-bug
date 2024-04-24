import { Injectable } from '@angular/core';
import { VudDrawerService } from '@vismaux/ngx-vud';
import { DrawerComponent } from '../drawer/drawer.component';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private _drawerRef: any;
  constructor(private _drawerService: VudDrawerService) { }
  // readonly drawer = inject(VudDrawerService);

  showDrawer() {
    this._drawerRef = this._drawerService.open(DrawerComponent, null, {
      // These options have highest priority even if they were changed globally
      width: '30%',
      maxWidth: '76rem',
      hasBackdrop: true,
      closeOnEscape: false,
      closeOnNavigation: false,
      closeOnOutsideClick: false,
    })
  }
  closeDrawer() {
    this._drawerRef.close();
  }
}
