import React from 'react';
import {addPostActionCreator, AddPostActionCreatorType} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {postType} from "../../../Types/Types";

export type MapStateToPropsType = {
    posts: Array<postType> ,
    newPostText: string,
}
const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};
export type MapDispatchTiProps = {
    addPost: (newPostText: string) => AddPostActionCreatorType
}
const mapDispatchToProps = {
    addPost: addPostActionCreator,
};

const MyPostsContainer = connect<MapStateToPropsType,MapDispatchTiProps, unknown, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;