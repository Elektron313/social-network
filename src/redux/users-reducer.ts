import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';
import { UserType } from '../Types/Types';
import { BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [], // array of users id
    fake: 10,
};

type InitialState = {
    users: UserType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[]; // array of users id
    fake: number;
};
type FollowSuccess = PayloadAction<{ userId: number }>;
type SetUsers = PayloadAction<{ users: UserType[] }>;
type SetCurrentPage = PayloadAction<{ currentPage: number }>;
type SetTotalUsersCount = PayloadAction<{ totalCount: number }>;
type ToggleIsFetching = PayloadAction<{ isFetching: boolean }>;
type ToggleFollowingProgress = PayloadAction<{ isFetching: boolean; userId: number }>;

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        followSuccess: (state, { payload }: FollowSuccess) => {
            state.users = updateObjectInArray(state.users, payload.userId, 'id', { followed: true });
        },
        unfollowSuccess: (state, { payload }: FollowSuccess) => {
            state.users = updateObjectInArray(state.users, payload.userId, 'id', { followed: false });
        },
        setUsers: (state, { payload }: SetUsers) => {
            state.users = payload.users;
        },
        setCurrentPage: (state, { payload }: SetCurrentPage) => {
            state.currentPage = payload.currentPage;
        },
        setTotalUsersCount: (state, { payload }: SetTotalUsersCount) => {
            state.totalUsersCount = payload.totalCount;
        },
        toggleIsFetching: (state, { payload }: ToggleIsFetching) => {
            state.isFetching = payload.isFetching;
        },
        toggleFollowingProgress: (state, { payload }: ToggleFollowingProgress) => {
            state.followingInProgress = payload.isFetching
                ? [...state.followingInProgress, payload.userId]
                : state.followingInProgress.filter((id) => id !== payload.userId);
        },
    },
});

const { reducer: usersReducer } = usersSlice;
const {
    followSuccess,
    unfollowSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    toggleFollowingProgress,
} = usersSlice.actions;

type RequestUsers = BaseThunkType<ToggleIsFetching | SetCurrentPage | SetUsers | SetTotalUsersCount>;

export const requestUsers = (currentPage: number, pageSize: number): RequestUsers => {
    return async (dispatch) => {
        dispatch(toggleIsFetching({ isFetching: true }));
        dispatch(setCurrentPage({ currentPage }));
        const { items: users, totalCount } = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching({ isFetching: false }));
        dispatch(setUsers({ users }));
        dispatch(setTotalUsersCount({ totalCount }));
    };
};

const _followUnfollowFlow = async (
    dispatch: Dispatch<FollowSuccess>,
    userId: number,
    apiMethod: any,
    actionCreator: (param: { userId: number }) => FollowSuccess
) => {
    dispatch(toggleFollowingProgress({ isFetching: true, userId }));
    const response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator({ userId }));
    }
    dispatch(toggleFollowingProgress({ isFetching: false, userId }));
};

export const follow = (userId: number) => (dispatch: Dispatch): Promise<void> => {
    return _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};
export const unfollow = (userId: number) => (dispatch: Dispatch): Promise<void> => {
    return _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};

export default usersReducer;
