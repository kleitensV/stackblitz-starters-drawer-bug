
import { Injectable, Injector } from '@angular/core';
import { Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { lastValueFrom } from 'rxjs';
import { IDrawerState } from './drawer-state';

@State<IDrawerState>({
  name: 'IDrawerState',
  defaults: {
    data: {
    }
  }
})

@Injectable()
export class DrawerStore {

  @Selector()
  public static getDrawerState(
    state: IDrawerState
  ): IDrawerState {
    return state;
  }

  @Receiver()
  public static async loadUserInfo(context: StateContext<IDrawerState>): Promise<void> {
// context.setState(
      //   produce(draft => {
      //     draft.data.userInfo = userInfo;
      //   })
      // );

  }


  constructor(injector: Injector) {
  }

  public async ngxsOnInit(context?: StateContext<IDrawerState>): Promise<void> {

  }
}
