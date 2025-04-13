import {FC, PropsWithChildren, useEffect, useState} from "react";
import {IComment} from "../../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";
import PostForm from "../../../../formContainer/form/PostForm.tsx";
import postsService from "../../../../../../services/apiServices/posts/postsService.ts";
import useFetchData from "../../../../../../hooks/fetch/useFetchData.ts";

interface IProps extends PropsWithChildren{
    comment: IComment;
}

const Comment:FC<IProps> = ({ comment }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [isComments, setIsComments] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [allComments, setAllComments] = useState<IComment[]>([]);

    useEffect(() => {
    }, [isReplying]);
    const { items: comments, pageData} = useFetchData<IComment>(currentPage, (page) => postsService.getChildComments(page, comment.id));
    const loadMoreComments = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    useEffect(() => {
        if (comments && comments.length > 0) {
            setAllComments(prevComments => [...prevComments, ...comments]);
        }
    }, [comments]);
    return (
        <div className="Comment">
            <div className="Comment-header">
                <h5>{comment?.username}</h5>
                <p>{comment?.id}</p>
                <span>{new Date(comment?.created_at).toLocaleString()}</span>
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
            <button onClick={() => setIsReplying(!isReplying)}>
                {isReplying ? "Hide formContainer" : "Answer"}
            </button>
            {isReplying &&
                <PostForm setLoading={setIsReplying} service={postsService.createComment} post_id={comment.post}
                          parent={comment.id?.toString()}/>
            }
            <button className='Show-comments' disabled={comment.comments_count <= 0}
                    onClick={() => (setIsComments(prev => !prev))}>
                {comment.comments_count > 0 ? (isComments ? "Hide replies" : `Show replies (${comment?.comments_count})`) : "No replies yet"}
            </button>
            {isComments && (
                <>
                    <div className="Comment-replies">
                        {allComments?.map(reply => (
                            <Comment key={reply?.id} comment={reply} />
                        ))}
                    </div>
                    <button onClick={loadMoreComments} disabled={pageData?.next === false}>
                        {pageData?.next === false ? "No more comments" : "Load more comments"}
                    </button>
                </>
            )}

        </div>
    );
};

export default Comment;