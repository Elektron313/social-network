import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {
    follow,
    unfollow,  requestUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../Types/Types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    followingInProgress: Array<number>,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<UserType>,
};

type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize:number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

// const connector = connect(MapStateToPropsType, MapDispatchToPropsType);


const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

const mapDispatchToProps = {
    follow,
    unfollow,
    getUsers: requestUsers,
};

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsType = ConnectedProps<typeof connector>

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}





export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps)
)(UsersContainer);