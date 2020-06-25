import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { addPost } from '../../../redux/profile-reducer';

const maxLength10 = maxLengthCreator(10);

type AddNewPostFormValueType = {
    newPostText: string;
};
const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValueType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="newPostText"
                    component={Textarea}
                    placeholder={'Post message'}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm<AddNewPostFormValueType>({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);

const MyPosts: React.FC = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state: AppStateType) => state.profilePage);
    const postsElements = [...posts]
        .reverse()
        .map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);
    const onAddPost = (values: AddNewPostFormValueType) => {
        dispatch(addPost({ newPostText: values.newPostText }));
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
};

export default React.memo(MyPosts);
