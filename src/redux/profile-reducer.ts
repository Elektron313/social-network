import { profileAPI, ResultCodesEnum } from '../api/api';
import { FormAction, stopSubmit } from 'redux-form';
import { PhotoType, ProfileType } from '../Types/Types';
import { AppStateType, BaseThunkType } from './redux-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Post = {
    id: number;
    message: string;
    likesCount: number;
};

type InitState = {
    posts: Post[];
    profile: null | ProfileType;
    status: string;
    newPostText: string;
    isLoading: boolean;
};

const initialState: InitState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 },
    ],
    isLoading: false,
    profile: null,
    status: '',
    newPostText: '',
};
export type AddPost = PayloadAction<{ newPostText: string }>;
type SavePhoto = PayloadAction<{ photo: PhotoType }>;
type SetStatus = PayloadAction<{ status: string }>;
type SetUserProfile = PayloadAction<{ profile: ProfileType }>;
type DeletePost = PayloadAction<{ postId: number }>;
type SetIsLoading = PayloadAction<{ isLoading: boolean }>

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        addPost: (state, { payload }: AddPost) => {
            const newPost = {
                id: 5,
                message: payload.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        },
        savePhotoAccess: (state, { payload }: SavePhoto) => {
            state.profile!.photos = payload.photo;
        },
        setStatus: (state, { payload }: SetStatus) => {
            state.status = payload.status;
        },
        setUserProfile: (state, { payload }: SetUserProfile) => {
            state.profile = payload.profile;
        },
        deletePost: (state, { payload }: DeletePost) => {
            state.posts = state.posts.filter((p) => p.id !== payload.postId);
        },
        setIsLoading: (state, { payload }: SetIsLoading) => {
            state.isLoading = payload.isLoading;
        },
    },
});

const { reducer: profileReducer } = profileSlice;
export const { addPost, deletePost, savePhotoAccess, setStatus, setUserProfile, setIsLoading } = profileSlice.actions;

export type GetUserProfileThunk = BaseThunkType<SetUserProfile>;
export const getUserProfile = (userId: number): GetUserProfileThunk => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile({ profile: data }));
};
export type GetAndUpdateStatusType = BaseThunkType<SetStatus>;
export const getStatus = (userId: number): GetAndUpdateStatusType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus({ status: data }));
};

export const updateStatus = (status: string): GetAndUpdateStatusType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus({ status }));
    }
};

export type SavePhotoTypeThunk = BaseThunkType<SavePhoto>;
export const savePhoto = (file: File): SavePhotoTypeThunk => async (dispatch) => {
    const { data, resultCode } = await profileAPI.savePhoto(file);
    if (resultCode === ResultCodesEnum.Success) {
        dispatch(savePhotoAccess({ photo: data }));
    }
};
export type SetEditMode = (P: boolean) => void;
export type SaveProfileThunk = BaseThunkType<FormAction>;
export const saveProfile = (profile: ProfileType, setEditMode: SetEditMode): SaveProfileThunk => async (
    dispatch,
    getState: () => AppStateType
) => {
    const userId = getState().auth.userId!;
    const response = await profileAPI.saveProfile(profile);

    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
        setEditMode(false);
    } else {
        dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }));
        return Promise.reject(response.messages[0]);
    }
};

export default profileReducer;
