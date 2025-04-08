import {apiService, IRes} from "../apiService";
import {urls} from "../../../constants";
import {IAuth, IRegister, IUser, IVerifyEmail} from "../../../interfaces/userInterface/userInterface.ts";
import {ITokens} from "../../../interfaces/tokenInterface/tokenInterface.ts";
const accessTokenKey = 'access'
const refreshTokenKey = 'refresh'

export const authService = {
    register(user:IRegister):IRes<IRegister>{
        return apiService.post(urls.users.register, user)
    },
    activate(token:string){
        return apiService.post(`${urls.auth.activate}/${token}`)
    },
    async login(user:IAuth):Promise<IUser>{
        const {data} = await apiService.post<ITokens>(urls.auth.login, user)
        this.setTokens(data)
        const {data:me} = await this.me()
        return me
    },

    async refresh():Promise<void>{
        const refresh = this.getRefreshToken();
        const {data} = await apiService.post<ITokens>(urls.auth.refresh, {refresh});
        this.setTokens(data)
    },

    me():IRes<IUser>{
        return apiService.get(urls.auth.me)
    },
    setMe(user: IUser):IRes<IUser>{
        return apiService.patch(urls.auth.me, user)
    },
    setTokens({refresh, access}:ITokens):void{
        localStorage.setItem(accessTokenKey, access)
        localStorage.setItem(refreshTokenKey, refresh)
    },
    getAccessToken():string | null{
        return localStorage.getItem(accessTokenKey)
    },
    getRefreshToken():string | null{
        return localStorage.getItem(refreshTokenKey)
    },
    deleteTokens():void{
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    },
    verifyEmail(email: IVerifyEmail): void{
        try {
            apiService.patch(urls.auth.activate, email)
        }catch (e){
            console.log(e)
        }

    },
}