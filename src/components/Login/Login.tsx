import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';
import { AppStateType } from '../../redux/redux-store';

type LoginPropsOwnProps = {
    captchaUrl: string | null;
};

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginPropsOwnProps> & LoginPropsOwnProps> = ({
    handleSubmit,
    error,
    captchaUrl,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeysType>('Email', 'email', [required], Input)}
            {createField<LoginFormValuesKeysType>('Password', 'password', [required], Input, {
                type: 'password',
            })}
            {createField<LoginFormValuesKeysType>(
                undefined,
                'rememberMe',
                [],
                Input,
                { type: 'checkbox' },
                'remember me'
            )}

            {error && <div className={style.formSummaryError}>{error}</div>}
            {captchaUrl && (
                <div>
                    <img src={captchaUrl} alt={'Captcha'} />
                </div>
            )}
            {captchaUrl && createField<LoginFormValuesKeysType>('symbols from image', 'captcha', [required], Input)}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginPropsOwnProps>({ form: 'login' })(LoginForm);

const Login: React.FC<PropsLoginType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    );
};
type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string>;

type MapStatePropsType = {
    captchaUrl: string | null;
    isAuth: boolean;
};

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

type PropsLoginType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
});

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, { login })(
    Login
);
