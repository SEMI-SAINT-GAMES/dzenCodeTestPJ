import { useEffect } from 'react';
import {IComment, IPost} from "../../interfaces/postsInterfaces/postsInterfaces.ts";
import {socketUrls} from "../../constants";

const useWebSocketComment = (setPosts: React.Dispatch<React.SetStateAction<IPost[]>>) => {
    useEffect(() => {
        const commentSocket = new WebSocket(socketUrls.comments);
        commentSocket.onopen = () => console.log('WebSocket connected for comments');
        commentSocket.onmessage = (event) => {
            const newComment = JSON.parse(event.data);
            setPosts((prevPosts) => {
                const postId = newComment.data.id;
                const postIndex = prevPosts.findIndex((post) => post.id === postId);

                if (postIndex !== -1) {
                    const updatedPost = {
                        ...prevPosts[postIndex],
                        comments: [
                            ...(prevPosts[postIndex].comments ?? []).filter(
                                (existingComment: IComment) => !newComment.data.comments.some(
                                    (newCmt: IComment) => newCmt.id === existingComment.id
                                )
                            ),
                            ...newComment.data.comments,
                        ],
                    };

                    const updatedPosts = [...prevPosts];
                    updatedPosts[postIndex] = updatedPost;
                    return updatedPosts;
                }
                return prevPosts;
            });
        };
        commentSocket.onerror = (error) => console.log('WebSocket error for comments:', error);
        commentSocket.onclose = () => console.log('WebSocket connection closed for comments');

        return () => {
            commentSocket.close();
        };
    }, [setPosts]);
};

export default useWebSocketComment;
