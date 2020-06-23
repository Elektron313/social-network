import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    isAuth: boolean;
    login: string | null;
};

type DispatchToPropsType = {
    logout: () => void;
};

type HeaderContainerPropsType = MapStateToPropsType & DispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props} />;
    }
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapStateToPropsType, DispatchToPropsType, unknown, AppStateType>(mapStateToProps, { logout })(
    HeaderContainer
);
