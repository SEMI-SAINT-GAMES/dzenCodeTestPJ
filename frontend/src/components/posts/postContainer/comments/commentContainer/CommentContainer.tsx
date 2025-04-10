import {FC, PropsWithChildren} from "react";
import {IComment} from "../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import Comment from "./comment/Comment.tsx";

interface IProps extends PropsWithChildren{
    comment: IComment;
}
const CommentContainer:FC<IProps> = ({comment}) => {
    return (
        <div className='Comment-container'>
            <Comment comment={comment}/>
        </div>
    );
};

export default CommentContainer;