
import { Injectable, Injector } from '@angular/core';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { lastValueFrom } from 'rxjs';
import { IModalState } from './modal-state';
import * as _ld from 'lodash-es';

@State<IModalState>({
  name: 'IModalState',
  defaults: {
    data: {
      modalInputValue:''
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
  public static async updateModalInputValue(context: StateContext<IModalState>,
    action: EmitterAction<string>): Promise<void> {
    let currentState = context.getState();
    let inputVal = currentState.data.modalInputValue

    context.setState(
      produce(draft => {
        draft.data.modalInputValue = inputVal ;
      })
    );
  }


  constructor(injector: Injector) {
  }

  public async ngxsOnInit(context?: StateContext<IModalState>): Promise<void> {

  }
}
