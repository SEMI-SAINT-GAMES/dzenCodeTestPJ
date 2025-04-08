const baseURL = import.meta.env.VITE_APP_API;
const posts = {
    base: '/posts',
    postsWithComments: '/post_with_comments'
}

const urls = {
    posts:{
        getWithComments: baseURL + posts.base + posts.postsWithComments,
    }
}

export {
    urls, baseURL
}