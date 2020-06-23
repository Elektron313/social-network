import React from 'react';
import { DialogsInitialStateType, SendMessage, sendMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    dialogsPage: DialogsInitialStateType;
};

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

type MapDispatchToPropsType = {
    sendMessage: (payload: { body: string }) => SendMessage;
};
const mapDispatchToProps = {
    sendMessage: sendMessage,
};

export type PropsDialogsType = MapStateToPropsType & MapDispatchToPropsType;
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs) as React.ComponentType;
