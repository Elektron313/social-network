import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Types/Types";
import {SavePhoto, UpdateStatus, SaveProfile} from './ProfileContainer';

export type PropsProfileType = {
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,
    updateStatus: UpdateStatus,
    savePhoto: SavePhoto,
    saveProfile: SaveProfile
}

const Profile: React.FC<PropsProfileType> = (props) => {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
};

export default Profile;