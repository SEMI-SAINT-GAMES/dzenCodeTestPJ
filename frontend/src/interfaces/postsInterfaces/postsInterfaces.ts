export interface IPost{
    id?:number
    text:string
    username:string
    email:string
    comments?:IComment[]
    replies?: IComment[]
    image?: File | string;
    text_file?: File | string;
    created_at: string;
}
export interface IComment{
    id?:number
    text:string
    username:string
    email:string
    replies?: IComment[]
    image?: File | string;
    text_file?: File | string;
    created_at: string;
}