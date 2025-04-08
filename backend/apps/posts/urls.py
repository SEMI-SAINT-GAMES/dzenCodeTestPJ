from .views import CreatePostAPIView, GetPostsAPIView, CreateCommentAPIView, PostWithCommentsView
from django.urls import path

urlpatterns = [
    path('create_post', CreatePostAPIView.as_view(), name='posts_create'),
    path('all_posts', GetPostsAPIView.as_view(), name='posts_get_all'),
    path('create_comment', CreateCommentAPIView.as_view(), name='posts_create_comment'),
    path('post_with_comments', PostWithCommentsView.as_view(), name='posts_get_post_with_comments')

]
