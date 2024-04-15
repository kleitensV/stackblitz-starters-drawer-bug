
import { Injectable, Injector } from '@angular/core';
import { Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { lastValueFrom } from 'rxjs';
import { IModalState } from './modal-state';

@State<IModalState>({
  name: 'IModalState',
  defaults: {
    data: {
    }
  }
})

@Injectable()
export class ModalStore {

  @Selector()
  public static getModalState(
    state: IModalState
  ): IModalState {
    return state;
  }

  @Receiver()
  public static async loadUserInfo(context: StateContext<IModalState>): Promise<void> {
// context.setState(
      //   produce(draft => {
      //     draft.data.userInfo = userInfo;
      //   })
      // );

  }


  constructor(injector: Injector) {
  }

  public async ngxsOnInit(context?: StateContext<IModalState>): Promise<void> {

  }
}
