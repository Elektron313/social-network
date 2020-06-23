import React from 'react';
import styles from './FormsControls.module.css';
import { ValidatorType } from '../../../utils/validators/validators';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps;
};

const FormControl: React.FC<FormControlsPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    );
};

export function createField<TypeName extends string>(
    placeholder: string | undefined,
    name: TypeName,
    validators: Array<ValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {},
    text = ''
) {
    return (
        <div>
            <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />{' '}
            {text}
        </div>
    );
}
