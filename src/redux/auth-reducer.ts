import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api";
import {FormErrors, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URl_SUCCESS = 'auth/GET_CAPTCHA_URl';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null  as string | null, // if null, then captcha is not required,
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action : ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URl_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
};

type SetAuthUserDataActionPayloadType = {
    type: typeof SET_USER_DATA
    payload: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
    }
}

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URl_SUCCESS,
    payload: {
        captchaUrl: string
    }
};

type ActionsType = SetAuthUserDataActionPayloadType | GetCaptchaUrlSuccessType;

export const setAuthUserData = (userId: number | null, email: string | null,
                                login: string | null, isAuth: boolean ): SetAuthUserDataActionPayloadType => ({
    type: SET_USER_DATA, payload:
        {userId, email, login, isAuth}
});


const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URl_SUCCESS,
    payload: {captchaUrl}
});
export type GetAuthUserDataType =  ThunkAction<Promise<void>, AppStateType, unknown, SetAuthUserDataActionPayloadType>
export const getAuthUserData = () : GetAuthUserDataType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

// type ActionDispatchLoginType = GetAuthUserDataType & GetCaptchaUrlSuccessType | FormAction
// type LoginType = ThunkAction<Promise<void>, AppStateType, unknown, ActionDispatchLoginType>
export const login = (email: string, password: string, rememberMe: boolean, captcha: string)  => async (dispatch : any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if ( loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
};

type LogoutType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const logout = (): LogoutType => async (dispatch)  => {
    let response = await authAPI.logout();

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};
type GetCaptchaUrlType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getCaptchaUrl = (): GetCaptchaUrlType  => async (dispatch ) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;