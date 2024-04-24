
import { Injectable, Injector } from '@angular/core';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { lastValueFrom } from 'rxjs';
import { IDrawerState } from './drawer-state';

@State<IDrawerState>({
  name: 'IDrawerState',
  defaults: {
    data: {
      drawerInputValue:'',
      selectItem:null
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
  public static async updateDrawerInputValue(context: StateContext<IDrawerState>,
    action: EmitterAction<string>): Promise<void> {
    let currentState = context.getState();
    let inputVal = currentState.data.drawerInputValue

    // context.setState(
    //   produce(draft => {
    //     draft.data.drawerInputValue = inputVal ;
    //   })
    // );
    context.patchState({
      data: {
        ...currentState.data,
        drawerInputValue: action.payload
      }
    });
    console.log("inputVal",inputVal);

  }

  @Receiver()
  public static async updateDrawerSelectValue(context: StateContext<IDrawerState>,
    action: EmitterAction<string|null>): Promise<void> {
    let currentState = context.getState();
    let inputVal = currentState.data.drawerInputValue
    context.patchState({
      data: {
        ...currentState.data,
        selectItem: action.payload
      }
    });
    console.log("inputVal",inputVal);

  }

  constructor(injector: Injector) {
  }

  public async ngxsOnInit(context?: StateContext<IDrawerState>): Promise<void> {

  }
}
