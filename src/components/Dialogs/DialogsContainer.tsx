import React from 'react';
import {DialogsInitialStateType, sendMessageCreator, SendMessageCreatorType} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    dialogsPage : DialogsInitialStateType
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => SendMessageCreatorType
}
let mapDispatchToProps =  {
    sendMessage: sendMessageCreator
};

export type PropsDialogsType = MapStateToPropsType & MapDispatchToPropsType
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);