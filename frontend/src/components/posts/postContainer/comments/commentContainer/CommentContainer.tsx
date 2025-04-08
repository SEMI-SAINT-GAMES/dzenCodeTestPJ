import {FC, PropsWithChildren} from "react";
import {IPost} from "../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import Comment from "./comment/Comment.tsx";

interface IProps extends PropsWithChildren{
    comment: IPost;
}
const CommentContainer:FC<IProps> = ({comment}) => {
    return (
        <div className='Comment-container'>
            <Comment comment={comment}/>
        </div>
    );
};

export default CommentContainer;