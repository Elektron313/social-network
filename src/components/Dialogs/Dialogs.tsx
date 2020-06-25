import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import AddMessageForm from './AddMessageForm/AddMessageForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessage } from '../../redux/dialogs-reducer';

export type AddNewMessageFormValueType = {
    newMessageBody: string;
};

const Dialogs: React.FC = () => {
    const dispatch = useDispatch();
    const { dialogs, messages } = useSelector((state: AppStateType) => state.dialogsPage)


    const dialogsElements = dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id} />);
    const messagesElements = messages.map((m) => <Message message={m.message} key={m.id} />);
    const addNewMessage = (values: AddNewMessageFormValueType) => {
        dispatch(sendMessage({ body: values.newMessageBody }));
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    );
};

export default withAuthRedirect(Dialogs) as React.ComponentType;
