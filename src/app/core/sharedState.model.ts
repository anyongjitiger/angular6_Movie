import { InjectionToken,Injectable } from "@angular/core";
export enum MODES {
    CREATE, EDIT
}
@Injectable()
export class SharedState {
    constructor(public mode: MODES, public id ?: number){ }
}

export const SHARED_STATE = new InjectionToken<string>("shared_state");