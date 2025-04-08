import {FC, PropsWithChildren} from "react";
import {IComment} from "../../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";

interface IProps extends PropsWithChildren{
    comment: IComment;
}

const Comment:FC<IProps> = ({comment}) => {
    return (
        <div className="Comment">
            <div className="Comment-header">
                <h5>{comment?.username}</h5>
                <span>{new Date(comment?.created_at).toLocaleDateString()}</span>
            </div>
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment?.text || '')}}/>
            {comment?.text_file && (
                <div className="Comment-file">
                    <a href={`/posts/download_file/${comment.text_file}`} target="_blank" rel="noopener noreferrer">
                        Скачать файл
                    </a>
                </div>
            )}
            {comment?.image && (
                <div className="Comment-image">
                    <img src={`/media/${comment.image}`} alt="comment" width="320" height="240"/>
                </div>
            )}
                <div className="Comment-replies">
                    {comment.replies?.map(reply => (
                        <Comment key={reply.id} comment={reply}/>
                    ))}
                </div>

        </div>
    );
};

export default Comment;