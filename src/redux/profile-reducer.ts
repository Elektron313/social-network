import {profileAPI, usersAPI, ResultCodesEnum} from "../api/api";
import {stopSubmit} from 'redux-form';
import {PhotoType, postType, ProfileType} from "../Types/Types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile-reducer/SET_STATUS';
const DELETE_POST = 'profile-reducer/DELETE_POST';
const SAVE_PHOTO = 'profile-reducer/SAVE_PHOTO';




let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<postType>,
    profile: null as null | ProfileType,
    status: '',
    newPostText: '',
};

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as ProfileType
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        default:
            return state;
    }
};

export type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string,
};

type  SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType,
}

type SetStatusType = {
    type: typeof SET_STATUS,
    status: string,
}

type DeletePostType = {
    type: typeof DELETE_POST,
    postId: number,
}

type SavePhotoAccessType = {
    type: typeof SAVE_PHOTO,
    photo: PhotoType,
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});
const savePhotoAccess = (photo: PhotoType): SavePhotoAccessType => ({ type: SAVE_PHOTO, photo});

export type GetUserProfileThunk = ThunkAction<Promise<void>, AppStateType, unknown, SetUserProfileType >
export const getUserProfile = (userId: number): GetUserProfileThunk => async (dispatch) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};
export type GetAndUpdateStatusType = ThunkAction<Promise<void>, AppStateType, unknown, SetStatusType>
export const getStatus = (userId: number): GetAndUpdateStatusType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string): GetAndUpdateStatusType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus(status));
    }
};

export type SavePhotoTypeThunk = ThunkAction<Promise<void>, AppStateType, unknown, SavePhotoAccessType>
export const savePhoto = (file: any): SavePhotoTypeThunk => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(savePhotoAccess(response.data.data.photos));
    }
};

// Пока не знаю как типизировать dispatch thunk , вернуться позже.
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }


};

export default profileReducer;