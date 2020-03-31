import  axios from "axios";
import {PhotoType, ProfileType} from "../Types/Types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "5e80eff9-c40f-49d1-bf68-c0785d2020cd"
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.');
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status : string) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photo : any) {
        const formData = new FormData();
        formData.append('image', photo);
        return  instance.put('profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile)
    }
};

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginMeResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};

export enum ResultCodesEnum {
    Success = 0 ,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10 ,
}

type MeResponseType = {
    data: { id: number, email: string, login: string },
    resultCode: ResultCodesEnum,
    messages: Array<string>,

}

type LoginMeResponseType = {
    data: { userId: number },
    resultCode: ResultCodesEnum | ResultCodeForCaptcha,
    messages: Array<string>,
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`);
    },
};

