import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { AddNewMessageFormValueType } from '../Dialogs';

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<AddNewMessageFormValueType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    validate={[required, maxLength50]}
                    placeholder="Enter your message"
                    name="newMessageBody"
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
};

export default reduxForm<AddNewMessageFormValueType>({ form: 'dialog-add-message-form' })(AddMessageForm);
