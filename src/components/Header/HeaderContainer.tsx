import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

const HeaderContainer: React.FC = () => {
    const { isAuth, login } = useSelector((state: AppStateType) => state.auth)
    return <Header isAuth={isAuth} login={login} logout={logout} />;
};

export default HeaderContainer;
