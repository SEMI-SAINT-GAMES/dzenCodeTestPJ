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
    useEffect(() => {

    }, [commentForm]);
    return (
        <>
         <div className="Post-container">
             <Post  post={post}/>
             <button className='To-omment' onClick={() => (setCommentForm(prevState => !prevState))}>
                 {commentForm ? "Hide formContainer" : "Comment"}
             </button>
             {commentForm && <PostForm service={postsService.createComment} setLoading={setCommentForm} post_id={post.id} parent={'main'}/> }
             {<Comments comments={post?.comments}/>}

         </div>
        </>
    );
};

export default PostContainer;