import {FC, PropsWithChildren, useEffect, useState} from "react";
import {IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import Comments from "./comments/Comments.tsx";
import Post from "./post/Post.tsx";
import PostForm from "../formContainer/form/PostForm.tsx";
import postsService from "../../../services/apiServices/posts/postsService.ts";

interface IProps extends PropsWithChildren{
    post: IPost;
}

const PostContainer:FC<IProps> = ({post}) => {
    const [commentForm, setCommentForm] = useState(false)
    const [isComments, setIsComments] = useState(false)
    useEffect(() => {
    }, [commentForm]);
    useEffect(() => {

    }, [isComments]);
    return (
        <>
         <div className="Post-container">
             <Post  post={post}/>
             <button className='To-comment' onClick={() => (setCommentForm(prev => !prev))}>
                 {commentForm ? "Hide form" : "Comment"}
             </button>
             <button className='Show-comments' onClick={() => (setIsComments(prev => !prev))}>
                 {isComments ? "Hide comments" : "Show comments"}
             </button>
             {commentForm && <PostForm service={postsService.createComment} setLoading={setCommentForm} post_id={post.id} parent={'main'}/> }

             {isComments && <Comments comments={post?.comments}/>}

         </div>
        </>
    );
};

export default PostContainer;