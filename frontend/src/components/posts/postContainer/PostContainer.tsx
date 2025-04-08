import {FC, PropsWithChildren, useEffect, useState} from "react";
import {IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import Comments from "./comments/Comments.tsx";
import Post from "./post/Post.tsx";

interface IProps extends PropsWithChildren{
    post: IPost;
}

const PostContainer:FC<IProps> = ({post}) => {
    const [commentForm, setCommentForm] = useState(false)
    useEffect(() => {

    }, [commentForm]);
    return (
        <>
         <div className="Post-container">
             <Post  post={post}/>
             <button className='To-omment' onClick={() => (setCommentForm(prevState => !prevState))}>
                 {commentForm ? "Hide formContainer" : "Comment"}
             </button>
             {<Comments comments={post?.comments}/>}

         </div>
        </>
    );
};

export default PostContainer;