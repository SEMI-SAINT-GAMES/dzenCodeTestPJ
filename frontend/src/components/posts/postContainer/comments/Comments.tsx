import {FC, PropsWithChildren, useEffect, useState} from "react";
import {IComment} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import CommentContainer from "./commentContainer/CommentContainer.tsx";
import './commentsStyles.scss'
import useFetchData from "../../../../hooks/fetch/useFetchData.ts";
import postsService from "../../../../services/apiServices/posts/postsService.ts";
import useWebSocketComment from "../../../../hooks/webSockets/useWebSocketComment.ts";

interface IProps extends PropsWithChildren{
    postId: number | undefined;
}
const Comments:FC<IProps> = ({postId}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allComments, setAllComments] = useState<IComment[]>([]);
    const { items: comments, pageData, setItems: setComments} = useFetchData<IComment>(currentPage, (page) => postsService.getMainComments(page, postId));

    useWebSocketComment(setComments, currentPage)
    useEffect(() => {
        if (comments && comments.length > 0) {
            setAllComments(prevComments => [...prevComments, ...comments]);
        }
    }, [comments]);

    const loadMoreComments = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };


    return (
        <div className='Comments'>
            {allComments?.map(comment => <CommentContainer key={comment.id} comment={comment}/>)}
            <button onClick={loadMoreComments} disabled={pageData?.next === false}>
                {pageData?.next === false ? "No more comments" : "Load more comments"}
            </button>
        </div>
    );
};

export default Comments;