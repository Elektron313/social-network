import { authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI } from '../api/api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType } from './redux-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = SetAuth & SetCaptcha;

const initialState: AuthState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, // if null, then captcha is not required,
};

export type SetAuth = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
};
type SetCaptcha = {
    captchaUrl: string | null;
};
type SetAuthAction = PayloadAction<SetAuth>;
type SetCaptchaAction = PayloadAction<SetCaptcha>;
type ActionTypes = SetAuthAction | SetCaptchaAction;

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, { payload }: SetAuthAction) => ({ ...state, ...payload }),
        setCaptcha: (state, { payload }: SetCaptchaAction) => ({ ...state, ...payload }),
    },
});

export const { reducer: authReducer } = authSlice;
export const { setAuth, setCaptcha } = authSlice.actions;

export type GetAuthUserDataType = BaseThunkType<ActionTypes>;
export const getAuthUserData = (): GetAuthUserDataType => async (dispatch) => {
    const meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        const { id, login, email } = meData.data;
        dispatch(setAuth({ userId: id, email, login, isAuth: true }));
    }
};

type LoginType = BaseThunkType<ActionTypes | FormAction>;
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): LoginType => async (
    dispatch
) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }
};

type LogoutType = BaseThunkType<ActionTypes>;
export const logout = (): LogoutType => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuth({ userId: null, email: null, login: null, isAuth: false }));
    }
};
type GetCaptchaUrlType = BaseThunkType<ActionTypes>;
export const getCaptchaUrl = (): GetCaptchaUrlType => async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.url;
    dispatch(setCaptcha({ captchaUrl }));
};

export default authReducer;
