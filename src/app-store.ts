
import { Injectable, Injector } from '@angular/core';
import { Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { IFAppState } from './app-state';
import { produce } from 'immer';
import { lastValueFrom } from 'rxjs';

@State<IFAppState>({
  name: 'IFAppState',
  defaults: {
    data: {
    }
  }
})

@Injectable()
export class AppStore {

  @Selector()
  public static getAppState(
    state: IFAppState
  ): IFAppState {
    return state;
  }

  @Receiver()
  public static async loadUserInfo(context: StateContext<IFAppState>): Promise<void> {
// context.setState(
      //   produce(draft => {
      //     draft.data.userInfo = userInfo;
      //   })
      // );

  }


  constructor(injector: Injector) {
  }

  public async ngxsOnInit(context?: StateContext<IFAppState>): Promise<void> {

  }
}
