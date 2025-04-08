export interface IPost{
    id?:number
    text:string
    username:string
    email:string
    post?: number
    comments?:IPost[]
    image?: File | string;
    text_file?: File | string;
    created_at: string;
}