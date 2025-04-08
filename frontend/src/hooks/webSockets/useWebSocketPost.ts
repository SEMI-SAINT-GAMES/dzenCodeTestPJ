import {useEffect, useState} from 'react';
import {socketUrls} from "../../constants";
import {IPost} from "../../interfaces/postsInterfaces/postsInterfaces.ts";

const useWebSocketPost = (setPosts: React.Dispatch<React.SetStateAction<IPost[]>>, page: number) => {
    useEffect(() => {
        const postSocket = new WebSocket(socketUrls.posts);
        postSocket.onopen = () => console.log('WebSocket connected for posts');
        postSocket.onmessage = (event) => {
            if (page === 1){
                const newPost = JSON.parse(event.data);
                setPosts((prevPosts) => [newPost.data, ...prevPosts]);
            }

        };
        postSocket.onerror = (error) => console.log('WebSocket error for posts:', error);
        postSocket.onclose = () => console.log('WebSocket connection closed for posts');

        return () => {
            postSocket.close();
        };
    }, [setPosts]);
    useEffect(() => {
        console.log(page, 'page');
    }, [page]);
};

export default useWebSocketPost;
