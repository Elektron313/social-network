import axios from 'axios';
import { PhotoType, ProfileType, UserType } from '../Types/Types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9fba833b-9043-41ad-a335-5c9f1b20bf8a',
    },
});

instance.interceptors.response.use(({ data }) => data);

// eslint-disable-next-line @typescript-eslint/ban-types
type ApiResponse<T = {}, RC = ResultCodesEnum> = {
    resultCode: RC;
    messages: string[];
    data: T;
};
type ResponseUsers = {
    items: UserType[];
    totalCount: number;
    error: string;
};
type Auth = {
    id: number;
    email: string;
    login: string;
};
type Captcha = {
    url: string;
};

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10): Promise<ResponseUsers> {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    },
    follow(userId: number): Promise<ApiResponse> {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number): Promise<ApiResponse> {
        return instance.delete(`follow/${userId}`);
    },
};

export const profileAPI = {
    getProfile(userId: number): Promise<ProfileType> {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number): Promise<string> {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string): Promise<ApiResponse> {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photo: File): Promise<ApiResponse<PhotoType>> {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put('profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    },
    saveProfile(profile: ProfileType): Promise<ApiResponse> {
        return instance.put('profile', profile);
    },
};

export const authAPI = {
    me(): Promise<ApiResponse<Auth>> {
        return instance.get(`auth/me`);
    },
    login(
        email: string,
        password: string,
        rememberMe = false,
        captcha: null | string = null
    ): Promise<ApiResponse<{ userId: number }, ResultCodesEnum | ResultCodeForCaptcha>> {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout(): Promise<ApiResponse> {
        return instance.delete(`auth/login`);
    },
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

export const securityAPI = {
    getCaptcha(): Promise<Captcha> {
        return instance.get(`security/get-captcha-url`);
    },
};
