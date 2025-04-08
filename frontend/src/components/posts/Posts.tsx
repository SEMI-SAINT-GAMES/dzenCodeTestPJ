import {ChangeEvent, useEffect, useState} from "react";
import {IPost} from "../../interfaces/postsInterfaces/postsInterfaces.ts";
import {IPage} from "../../interfaces/pageInterface.ts";
import postsService from "../../services/apiServices/posts/postsService.ts";
import {useSearchParams} from "react-router-dom";
import PostContainer from "./postContainer/PostContainer.tsx";
import './postsStyles.scss'
import PaginationComponent from "../pagination/PaginationComponent.tsx";

const Posts = () => {
    const [postsPage, setPostsPage] = useState<IPage<IPost> | null>(null)
    const [query, setQuery] = useSearchParams({page:'1'})
    const [pagesCount, setPagesCount] = useState(5)

    const FetchData = async () => {
        try{
            const response = await postsService.getWithComments(+(query.get('page') || 1));
            if (response.data.results && Array.isArray(response.data.results)) {
                setPostsPage(response.data);
            } else {
                setPostsPage(null);
                console.log("No posts found");
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        FetchData();
        console.log("FetchData");

    }, [query.get('page')]);
    useEffect(() => {
        if (postsPage !== null)
            setPagesCount(postsPage.total_pages)
    }, [postsPage]);

    const handleChangePage = (_: ChangeEvent<unknown>, page:number) => {
        setQuery(prev => {prev.set('page', (page).toString())
            return prev
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            <div className="Posts">
                {postsPage?.results.map(post =><PostContainer key={post.id} post={post} />)}
                <PaginationComponent pagesCount={pagesCount} page={+(query.get('page') || 1)} handleChangePage={handleChangePage}/>
            </div>
        </>
    );
};

export default Posts;