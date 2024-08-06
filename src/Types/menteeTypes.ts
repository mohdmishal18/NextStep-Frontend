export interface signUpData {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword?: string
}

export interface MenteeProfile {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    isBlocked: boolean;
    education: string,
    bio: string
    otpVerified: boolean;
    profilePicture?:string;
    coverPicture?: string;
    __v: number;
}