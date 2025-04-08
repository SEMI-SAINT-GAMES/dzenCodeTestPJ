import {FC, PropsWithChildren} from "react";
import {IComment} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import CommentContainer from "./commentContainer/CommentContainer.tsx";
import './commentsStyles.scss'

interface IProps extends PropsWithChildren{
    comments:IComment[];
}
const Comments:FC<IProps> = ({comments}) => {
    return (
        <div className='Comments'>
            {comments.map(comment => <CommentContainer key={comment.id} comment={comment}/>)}
        </div>
    );
};

export default Comments;