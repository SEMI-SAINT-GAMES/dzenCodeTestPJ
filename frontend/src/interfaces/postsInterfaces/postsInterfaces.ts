export interface IPost{
    id?:number
    text:string
    username:string
    email:string
    post?: number
    image?: File | string;
    text_file?: File | string;
    created_at: string;
    comments_count: number;
}
export interface IComment{
    id?:number
    text:string
    username:string
    email:string
    post?: number
    parent: number
    image?: File | string;
    text_file?: File | string;
    created_at: string;
    comments_count: number;
}