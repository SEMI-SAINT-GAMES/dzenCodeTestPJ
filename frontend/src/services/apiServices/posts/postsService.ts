import {apiService, IRes} from "../apiService.ts";
import {ICaptcha, IComment, IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {IPage} from "../../../interfaces/pageInterface.ts";
import {urls} from "../../../constants";

const postsService = {
    getAll: (page:number, ordering?: string): IRes<IPage<IPost>> => apiService.get(`${urls.posts.getPosts}?page=${page}&ordering=${ordering}`),
    createPost: (post: FormData):IRes<IPost> => apiService.post(urls.posts.createPost, post),
    createComment: (post: FormData, post_id?: number, parent?: string):IRes<IComment> => apiService.post(`${urls.posts.createComment}/${post_id}/${parent}`, post),
    getMainComments: (page:number, post_id?: number):IRes<IPage<IComment>> => apiService.get(`${urls.posts.getMainComments}/${post_id}?page=${page}`),
    getChildComments: (page:number, parent_id?: number):IRes<IPage<IComment>> => apiService.get(`${urls.posts.getChildComments}/${parent_id}?page=${page}`),
    getCaptcha:(): IRes<ICaptcha> => apiService.get(`${urls.posts.getCaptcha}`),
}

export default postsService;
