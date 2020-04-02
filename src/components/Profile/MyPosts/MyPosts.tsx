import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import { MapStateToPropsType, MapDispatchTiProps } from './MyPostsContainer';

const maxLength10 = maxLengthCreator(10);

type AddNewPostFormValueType = {
    newPostText: string
}
let AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValueType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" component={Textarea} placeholder={"Post message"}
                   validate={[required, maxLength10]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
};

let AddNewPostFormRedux = reduxForm<AddNewPostFormValueType>({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts: React.FC<MapStateToPropsType & MapDispatchTiProps> = React.memo(props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let onAddPost = (values: AddNewPostFormValueType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;