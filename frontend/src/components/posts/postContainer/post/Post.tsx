import {FC, PropsWithChildren} from "react";
import {IPost} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";

interface IProps extends PropsWithChildren{
    post:IPost;
}
const Post:FC<IProps> = ({post}) => {
    return (
        <div className='Post' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post?.text || "")}}/>
    );
};

export default Post;