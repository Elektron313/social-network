import React from 'react';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import s from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControls.module.css';
import { ProfileType} from '../../../Types/Types';


type PropsDataFormOwnType = {
    profile: ProfileType
}

type ProfileDataKeysType = Extract<keyof ProfileType, string>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType> & PropsDataFormOwnType
    > = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            <div>
                <b>Full name</b> : {createField<ProfileDataKeysType>('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b> : {createField<ProfileDataKeysType>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>: {createField<ProfileDataKeysType>('My professional skills',
                'lookingForAJobDescription',
                [],
                Textarea
                )}
            </div>
            <div>
                <b>About me</b>: {createField<ProfileDataKeysType>('About me',
                'aboutMe',
                [],
                Textarea
            )}
            </div>
            <div>
                <b>Contacts</b>:{Object.keys(profile.contacts).map(key =>
                <div className={s.contact} key={key}>
                    <b>{key}</b> {createField('', 'contacts.' + key, [], Input)}
                </div>
            )}
            </div>
            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>
            }
        </form>
    )
};

const ProfileDataReduxForm = reduxForm<ProfileType, PropsDataFormOwnType>(
    {
        form: 'edit-profile'
}
)(ProfileDataForm);
export default ProfileDataReduxForm;