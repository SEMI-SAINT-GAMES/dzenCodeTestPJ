import {FC, PropsWithChildren} from "react";
import {IPost} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";

interface IProps extends PropsWithChildren{
    post:IPost;
}
const Post:FC<IProps> = ({post}) => {
    return (
        <div className='Post'>
            <h4>{post.id}</h4>
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post?.text || "")}}/>
        </div>
    );
};

export default Post;