// import {authAPI} from "../api/api";
// import {stopSubmit} from "redux-form";
import {getAuthUserData, GetAuthUserDataType} from "./auth-reducer";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initialStateType = {
    initialized: boolean
}


let initialState: initialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: initializedSuccessType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};

type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS,
}
export const initializedSuccess = (): initializedSuccessType => ({type: INITIALIZED_SUCCESS});

type ThunkType = ThunkAction<void, AppStateType, unknown, initializedSuccessType>
export const initializeApp = () : ThunkType => (dispatch)  => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
};


export default appReducer;