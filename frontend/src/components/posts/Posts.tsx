import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostContainer from "./postContainer/PostContainer.tsx";
import './postsStyles.scss';
import PaginationComponent from "../pagination/PaginationComponent.tsx";
import useWebSocketPost from "../../hooks/webSockets/useWebSocketPost.ts";
import NoData from "../noDataComponent/NoData.tsx";
import useFetchData from "../../hooks/fetch/useFetchData.ts";
import {IPost} from "../../interfaces/postsInterfaces/postsInterfaces.ts";
import postsService from "../../services/apiServices/posts/postsService.ts";
import {orderingOptions} from "../../constants/selectOptions.ts";

const Posts = () => {
    const [query, setQuery] = useSearchParams({ page: '1' });
    const [ordering, setOrdering] = useState<string>("-created_at")
    const { items: posts, pageData: postsPage, setItems: setPosts } = useFetchData<IPost>(+(query.get('page') || 1), postsService.getAll, ordering);
    useWebSocketPost(setPosts, +(query.get('page') || 0));


    const [pagesCount, setPagesCount] = useState(5);

    useEffect(() => {
        if (postsPage) setPagesCount(postsPage.total_pages);
    }, [postsPage]);

    const handleChangePage = (_: ChangeEvent<unknown>, page: number) => {
        setQuery((prev) => {
            prev.set('page', page.toString());
            return prev;
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };
    const handleOrderingChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrdering(event.target.value)
    }
    return (
        <div className="Posts">
            <select name="select" value={ordering} onChange={handleOrderingChange} required>
                <option value="-created_at" selected>- Publish date</option>
                {orderingOptions.map((option) => (
                    <option key={option.id} value={option.option}>
                        {option.text}
                    </option>
                ))}
            </select>
            {posts?.length ? (
                posts.map(post => <PostContainer key={post.id} post={post}/>)
            ) : (
                <NoData text={'Постів ще немає'}/>
            )}
            <PaginationComponent
                pagesCount={pagesCount}
                page={+(query.get('page') || 1)}
                handleChangePage={handleChangePage}
            />
        </div>
    );
};

export default Posts;
