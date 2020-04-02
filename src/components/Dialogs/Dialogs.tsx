import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {PropsDialogsType} from "./DialogsContainer";

export type AddNewMessageFormValueType = {
    newMessageBody: string
};

const Dialogs: React.FC<PropsDialogsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id} /> );


    let addNewMessage = (values: AddNewMessageFormValueType) => {
        props.sendMessage(values.newMessageBody);
    };

    // if (!props.isAuth) return <Redirect to={"/login"} /> ;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>{ messagesElements }</div>

            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
};

export default Dialogs;

























