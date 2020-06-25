import React, { useCallback, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { AppStateType } from '../../redux/redux-store';


const UsersContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { currentPage, pageSize, totalUsersCount, users, followingInProgress, isFetching } = useSelector(
        (state: AppStateType) => state.usersPage
    );
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize));
    }, []);

    const onPageChanged = useCallback(
        (pageNumber: number) => {
            requestUsers(pageNumber, pageSize);
        },
        [requestUsers]
    );

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                users={users}
                follow={follow}
                unfollow={unfollow}
                followingInProgress={followingInProgress}
            />
        </>
    );
}

export default UsersContainer;
