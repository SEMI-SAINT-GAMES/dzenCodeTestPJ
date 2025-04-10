import {apiService, IRes} from "../apiService.ts";
import {IComment, IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {IPage} from "../../../interfaces/pageInterface.ts";
import {urls} from "../../../constants";

const postsService = {
    getAll: (page:number): IRes<IPage<IPost>> => apiService.get(`${urls.posts.getPosts}?page=${page}`),
    createPost: (post: FormData):IRes<IPost> => apiService.post(urls.posts.createPost, post),
    createComment: (post: FormData, post_id?: number, parent?: string):IRes<IComment> => apiService.post(`${urls.posts.createComment}/${post_id}/${parent}`, post),
    getMainComments: (page:number, post_id?: number):IRes<IPage<IComment>> => apiService.get(`${urls.posts.getMainComments}/${post_id}?page=${page}`),
    getChildComments: (page:number, parent_id?: number):IRes<IPage<IComment>> => apiService.get(`${urls.posts.getChildComments}/${parent_id}?page=${page}`),
}

export default postsService;
