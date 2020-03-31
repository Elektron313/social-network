
export type postType = {
    id: number,
    message: string,
    likesCount: number,
};
export type contactsType = {
    skype: string,
    vk: string,
    facebook: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string,
};
export type PhotoType = {
    small: string | null,
    large: string | null,
}
export type ProfileType = {
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: contactsType,
    photos: PhotoType,
};
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotoType,
    followed: boolean,
};