import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
import { getAuthUserData } from './redux/auth-reducer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs'));
const ProfileContainer = React.lazy(() => import('./components/Profile/Profile'));

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthUserData());
    }, []);

    return (
        <div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <div className="app-wrapper-content">
                <Switch>
                    <Route path="/dialogs">{withSuspense(DialogsContainer)}</Route>
                    <Route path="/profile/:userId?">{withSuspense(ProfileContainer)}</Route>
                    <Route path="/users">
                        <UsersContainer />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Redirect from="/" to="/profile" />
                    <Route path="*">
                        <div>404 NOT FOUND</div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

const AppContainer = withRouter(App);

const SamuraiJSApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default SamuraiJSApp;
