import {apiService, IRes} from "../apiService.ts";
import {IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {IPage} from "../../../interfaces/pageInterface.ts";
import {urls} from "../../../constants";

const postsService = {
    getWithComments: (page:number):IRes<IPage<IPost>> => apiService.get(`${urls.posts.getWithComments}?page=${page}`),
    createPost: (post: IPost):IRes<IPost> => apiService.post(urls.posts.createPost, post)
}

export default postsService;
