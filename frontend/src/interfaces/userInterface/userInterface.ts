export interface IUser{
    id?: number;
    email: string;
    username: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    profile: IProfile
}

interface IProfile{
    id?: number;
    name: string;
    surname: string;
    created_at: string;
    updated_at: string;
}

export interface IRegister {
    email:string;
    password:string;
    profile: IProfile;
}
export interface IAuth{
    phone:string;
    password:string;
}
export interface IVerifyEmail{
    email: string;
}