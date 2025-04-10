import {useEffect} from 'react';
import {socketUrls} from "../../constants";
import {IComment} from "../../interfaces/postsInterfaces/postsInterfaces.ts";

const useWebSocketComment= (setComments: React.Dispatch<React.SetStateAction<IComment[]>>, page: number) => {
    useEffect(() => {
        const commentSocket = new WebSocket(socketUrls.comments);
        commentSocket.onopen = () => console.log('WebSocket connected for comments');
        commentSocket.onmessage = (event) => {
            if (page === 1){
                const newComment = JSON.parse(event.data);
                setComments((prevComments) => [newComment.data, ...prevComments]);
            }

        };
        commentSocket.onerror = (error) => console.log('WebSocket error for comments:', error);
        commentSocket.onclose = () => console.log('WebSocket connection closed for comments');

        return () => {
            commentSocket.close();
        };
    }, [setComments]);
    useEffect(() => {
        console.log(page, 'page');
    }, [page]);
};

export default useWebSocketComment;
