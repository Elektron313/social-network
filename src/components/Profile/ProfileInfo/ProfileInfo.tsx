import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import { PropsProfileType } from '../Profile';
import { ProfileType } from '../../../Types/Types';

const ProfileInfo: React.FC<PropsProfileType> = ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    saveProfile,
}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    // Пока не понял как типизировать
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => setEditMode(false));
    };
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img alt={'UserPhoto'} src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                {editMode ? (
                    <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                ) : (
                    <ProfileData profile={profile} goToEditForm={() => setEditMode(true)} isOwner={isOwner} />
                )}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    );
};

type ProfilePropsType = {
    profile: ProfileType;
    goToEditForm: () => void;
    isOwner: boolean;
};
const ProfileData: React.FC<ProfilePropsType> = ({ profile, goToEditForm, isOwner }) => {
    return (
        <div>
            {isOwner && (
                <div>
                    <button onClick={goToEditForm}>edit</button>
                </div>
            )}
            <div>
                <b>My name</b> :{profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b> :{profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob && (
                <div>
                    <b>My professional skills</b>:{profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me</b>:{profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => (
                    <Contact key={key} contactTittle={key} contactValue={profile.contacts[key]} />
                ))}
            </div>
        </div>
    );
};

type PropsContactType = {
    contactTittle: string;
    contactValue: string;
};

const Contact: React.FC<PropsContactType> = ({ contactTittle, contactValue }) => {
    return (
        <div className={s.contact}>
            <b>{contactTittle}</b>:{contactValue}
        </div>
    );
};

export default ProfileInfo;
