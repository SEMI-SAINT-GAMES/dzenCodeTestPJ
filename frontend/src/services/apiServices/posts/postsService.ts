import {apiService, IRes} from "../apiService.ts";
import {IComment, IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {IPage} from "../../../interfaces/pageInterface.ts";
import {urls} from "../../../constants";

const postsService = {
    getWithComments: (page:number):IRes<IPage<IPost>> => apiService.get(`${urls.posts.getWithComments}?page=${page}`),
    createPost: (post: FormData):IRes<IPost> => apiService.post(urls.posts.createPost, post),
    createComment: (comment: FormData, post: number, parent?: number | null):IRes<IComment> => apiService.post(`${urls.posts.createComment}/${post}/${post}/${parent}`, comment)
}

export default postsService;
