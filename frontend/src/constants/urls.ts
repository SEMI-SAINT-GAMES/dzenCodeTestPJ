const baseURL = import.meta.env.VITE_APP_API;
const baseSocketURL = import.meta.env.VITE_SOCKET_URL;
const posts = {
    base: '/posts',
    comment: '/comments',
    postsWithComments: '/post_with_comments'
}

const socketUrls = {
    posts: baseSocketURL + posts.base + '/',
    comments: baseSocketURL + posts.comment + '/',
}

const urls = {
    posts:{
        getWithComments: baseURL + posts.base + posts.postsWithComments,
    }
}

export {
    urls, baseURL, baseSocketURL, socketUrls
}