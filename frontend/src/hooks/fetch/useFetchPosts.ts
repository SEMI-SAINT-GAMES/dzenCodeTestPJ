import { useState, useEffect } from "react";
import postsService from "../../services/apiServices/posts/postsService.ts";
import {IPage} from "../../interfaces/pageInterface.ts";
import {IPost} from "../../interfaces/postsInterfaces/postsInterfaces.ts";

const useFetchPosts = (query: URLSearchParams) => {
    const [postsPage, setPostsPage] = useState<IPage<IPost> | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postsService.getWithComments(+(query.get('page') || 1));
                if (response.data.results && Array.isArray(response.data.results)) {
                    setPostsPage(response.data);
                    setPosts(response.data.results);
                } else {
                    setPostsPage(null);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchPosts();
    }, [query]);

    return { postsPage, posts, setPosts };
};

export default useFetchPosts;
