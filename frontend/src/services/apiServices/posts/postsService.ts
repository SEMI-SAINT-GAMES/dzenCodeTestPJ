import {apiService, IRes} from "../apiService.ts";
import {IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {IPage} from "../../../interfaces/pageInterface.ts";
import {urls} from "../../../constants";

const postsService = {
    getWithComments: (page:number):IRes<IPage<IPost>> => apiService.get(`${urls.posts.getWithComments}?page=${page}`),
    createPost: (post: FormData):IRes<IPost> => apiService.post(urls.posts.createPost, post),
    createComment: (post: FormData, post_id?: number, parent?: string):IRes<IPost> => apiService.post(`${urls.posts.createComment}/${post_id}/${parent}`, post)
}

export default postsService;
