const baseURL = import.meta.env.VITE_APP_API;
const baseSocketURL = import.meta.env.VITE_SOCKET_URL;
const posts = {
    base: '/posts',
    allPosts: '/all_posts',
    createPost: '/create_post',
    comment: '/comments',
    createComment: '/create_comment',
    getMainComments: '/get_main_comments',
    getChildComments: '/get_child_comments',
    postsWithComments: '/post_with_comments',
    captcha: '/captcha',

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
        getPosts: posts.base + posts.allPosts,
        createPost: posts.base + posts.createPost,
        createComment: posts.base + posts.createComment,
        getMainComments: posts.base + posts.getMainComments,
        getChildComments: posts.base + posts.getChildComments,
        getCaptcha: posts.base + posts.captcha,
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