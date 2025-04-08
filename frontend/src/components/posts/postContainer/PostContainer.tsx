import {FC, PropsWithChildren} from "react";
import {IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import Comments from "./comments/Comments.tsx";
import Post from "./post/Post.tsx";

interface IProps extends PropsWithChildren{
    post: IPost;
}

const PostContainer:FC<IProps> = ({post}) => {

    return (
        <>
         <div className="Post-container">
             <Post  post={post}/>
             {post?.comments?.length > 0 && <Comments comments={post.comments}/>}

         </div>
        </>
    );
};

export default PostContainer;