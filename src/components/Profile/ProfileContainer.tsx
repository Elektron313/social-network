import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    GetUserProfileThunk,
    savePhoto,
    saveProfile,
    updateStatus,
    GetAndUpdateStatusType, SavePhotoTypeThunk
} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../Types/Types";
import {AppStateType} from "../../redux/redux-store";

type MatchParams = {
    userId: string | undefined
}
type PropsProFileContainerType = MapStateToPropsType & DispatchToPropsType & RouteComponentProps<MatchParams>

class ProfileContainer extends React.Component<PropsProFileContainerType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            let MyUserId   = this.props.authorizedUserId;
            if (!MyUserId) {
                this.props.history.push("/login");
                return
            }
            this.props.getUserProfile(MyUserId);
            this.props.getStatus(MyUserId);
            return
        }
        this.props.getUserProfile(Number(userId));
        this.props.getStatus(Number(userId));
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:PropsProFileContainerType, prevState:PropsProFileContainerType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {
        return (
            <Profile {...this.props}
                 savePhoto={this.props.savePhoto}
                 saveProfile={this.props.saveProfile}
                 isOwner={!this.props.match.params.userId}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateStatus}/>
    )
    }
}
type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserId: number | null,
    isAuth: boolean,
}
let mapStateToProps = (state: AppStateType) : MapStateToPropsType => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
};

type GetUserProfileType = (id: number) => GetUserProfileThunk
type GetStatusType = (id: number) => GetAndUpdateStatusType
export type UpdateStatus = (status: string) => GetAndUpdateStatusType
export type SaveProfile = (profile: ProfileType) => any
export type SavePhoto = (file: any) => SavePhotoTypeThunk // Изменить, пока не знаю как типизировать фото.

type DispatchToPropsType = {
    getUserProfile: GetUserProfileType,
    getStatus:  GetStatusType,
    savePhoto:  SavePhoto
    saveProfile: SaveProfile,
    updateStatus: UpdateStatus
}

export default compose(
    connect<MapStateToPropsType, DispatchToPropsType, unknown, AppStateType>(mapStateToProps, {getUserProfile, getStatus, savePhoto,  updateStatus, saveProfile}),
    withRouter
)(ProfileContainer);




