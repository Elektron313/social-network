import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
type MapStateToPropsForRedirectType = {
    isAuth: boolean,
}
let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<MapStateToPropsForRedirectType> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />

            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;

};