export interface IPost{
    id:number
    text:string
    username:string
    email:string
    comments:IComment[]
}
export interface IComment{
    id:number
    text:string
    username:string
    email:string
    replies: IComment[]
}