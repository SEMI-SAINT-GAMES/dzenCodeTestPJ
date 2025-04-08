const baseURL = import.meta.env.VITE_APP_API;
const baseSocketURL = import.meta.env.VITE_SOCKET_URL;
const posts = {
    base: '/posts',
    comment: '/comments',
    postsWithComments: '/post_with_comments',
    createPost: '/create_post',
}
const auth = {
    base: '/auth',
    login: '/login',
    refresh: '/refresh',
    activate: '/activate',
    me: '/me'
}
const users = {
    base: '/users',

}

const socketUrls = {
    posts: baseSocketURL + posts.base + '/',
    comments: baseSocketURL + posts.comment + '/',
}

const urls = {
    posts:{
        getWithComments: posts.base + posts.postsWithComments,
        createPost: posts.base + posts.createPost,
        createComment: posts.base + posts.comment,
    },
    auth:{
        login: auth.base + auth.login,
        refresh:  auth.base + auth.refresh,
        activate: auth.base + auth.activate,
        me:  auth.base + auth.me,
    },
    users: {
        register: users.base
    }
}

export {
    urls, baseURL, baseSocketURL, socketUrls
}