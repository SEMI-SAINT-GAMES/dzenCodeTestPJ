import {FC, PropsWithChildren} from "react";
import {IComment} from "../../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import CommentContainer from "../CommentContainer.tsx";

interface IProps extends PropsWithChildren{
    comment: IComment;
}

const Comment:FC<IProps> = ({comment}) => {
    return (
        <div className='Comment'>
            {comment?.text}
            {comment.replies.length > 0 && comment.replies.map((comment => <CommentContainer key={comment.id} comment={comment}/>))}
        </div>
    );
};

export default Comment;