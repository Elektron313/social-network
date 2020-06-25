import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DialogType = {
    id: number;
    name: string;
};

type MessageType = {
    id: number;
    message: string;
};

export type DialogsInitialState = {
    dialogs: DialogType[];
    messages: MessageType[];
};

const initialState: DialogsInitialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your ?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
    ] as Array<MessageType>,
};

export type DialogsInitialStateType = typeof initialState;
export type SendMessage = PayloadAction<{ body: string }>;

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: initialState,
    reducers: {
        sendMessage: (state, { payload }: SendMessage) => ({
            ...state,
            messages: [...state.messages, { id: 6, message: payload.body }],
        }),
    },
});

const { reducer: dialogsReducer } = dialogsSlice;
export const { sendMessage } = dialogsSlice.actions;

export default dialogsReducer;
