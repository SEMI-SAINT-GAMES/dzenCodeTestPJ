import {FC, PropsWithChildren, useEffect, useState} from "react";
import {IPost} from "../../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";
import PostForm from "../../../../formContainer/form/PostForm.tsx";
import postsService from "../../../../../../services/apiServices/posts/postsService.ts";

interface IProps extends PropsWithChildren{
    comment: IPost;
}

const Comment:FC<IProps> = ({ comment }) => {
    const [isReplying, setIsReplying] = useState(false);
    useEffect(() => {

    }, [isReplying]);
    return (
        <div className="Comment">
            <div className="Comment-header">
                <h5>{comment?.username}</h5>
                <span>{new Date(comment?.created_at).toLocaleDateString()}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment?.text || '') }} />
            {comment?.text_file && (
                <div className="Comment-file">
                    <a href={`/posts/download_file/${comment.text_file}`} target="_blank" rel="noopener noreferrer">
                        Скачать файл
                    </a>
                </div>
            )}
            {comment?.image && (
                <div className="Comment-image">
                    <img src={`/media/${comment.image}`} alt="comment" width="320" height="240" />
                </div>
            )}
            <button onClick={() => setIsReplying(!isReplying)}>
                {isReplying ? "Hide formContainer" : "Answer"}
            </button>
            {isReplying &&
                <PostForm setLoading={setIsReplying} service={postsService.createComment} post_id={comment.post} parent={comment.id?.toString()}/>
            }

            <div className="Comment-replies">
                {comment.comments?.map(reply => (
                    <Comment key={reply.id} comment={reply} />
                ))}
            </div>
        </div>
    );
};

export default Comment;