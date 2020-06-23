import { AddPost, addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { postType } from '../../../Types/Types';

export type MapStateToPropsType = {
    posts: Array<postType>;
    newPostText: string;
};
const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};
export type MapDispatchToProps = {
    addPost: (param: { newPostText: string }) => AddPost;
};
const mapDispatchToProps = {
    addPost,
};

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToProps, unknown, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default MyPostsContainer;
