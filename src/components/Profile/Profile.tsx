import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    updateStatus,
    GetAndUpdateStatusType,
    SavePhotoTypeThunk, SaveProfileThunk, SetEditMode,
} from '../../redux/profile-reducer';
import { useParams, useHistory } from 'react-router-dom';
import { ProfileType } from '../../Types/Types';
import { AppStateType } from '../../redux/redux-store';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import Preloader from '../common/Preloader/Preloader';

type ParamsUrl = {
    userId: string;
};

const Profile: React.FC = () => {
    const { userId } = useParams<ParamsUrl>();
    const history = useHistory();
    const dispatch = useDispatch();
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId);
    const { profile, status, isLoading } = useSelector((state: AppStateType) => state.profilePage);
    const refreshProfile = () => {
        if (!userId) {
            const MyUserId = authorizedUserId;
            if (!MyUserId) {
                history.push('/login');
                return;
            }
            dispatch(getUserProfile(MyUserId));
            dispatch(getStatus(MyUserId));
            return;
        }
        dispatch(getUserProfile(parseInt(userId)));
        dispatch(getStatus(parseInt(userId)));
    };

    useEffect(() => {
        refreshProfile();
    }, [userId]);

    return (
        <div>
            {
                isLoading
                    ? <Preloader/>
                    : <>
                        <ProfileInfo
                            isOwner={!userId}
                            profile={profile}
                            status={status}
                            updateStatus={updateStatus}
                            savePhoto={savePhoto}
                            saveProfile={saveProfile}
                        />
                        <MyPosts />
                    </>
            }
        </div>
    );
};

export type UpdateStatus = (status: string) => GetAndUpdateStatusType;
export type SaveProfile = (profile: ProfileType, setEditMode: SetEditMode) => SaveProfileThunk;
export type SavePhoto = (file: File) => SavePhotoTypeThunk;

export default Profile;
