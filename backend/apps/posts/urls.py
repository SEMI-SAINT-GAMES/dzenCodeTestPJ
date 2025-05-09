from core.helpers.file_download_service import download_file
from .views import CreatePostAPIView, GetPostsAPIView, CreateCommentAPIView, PostWithCommentsAPIView
from django.urls import path

urlpatterns = [
    path('create_post', CreatePostAPIView.as_view(), name='posts_create'),
    path('all_posts', GetPostsAPIView.as_view(), name='posts_get_all'),
    path('comments/<int:post_id>/main', CreateCommentAPIView.as_view(), name='create_comment'),
    path('comments/<int:post_id>/<int:parent_id>', CreateCommentAPIView.as_view(), name='create_reply_comment'),
    path('post_with_comments', PostWithCommentsAPIView.as_view(), name='posts_get_post_with_comments'),
    path('download_file/<str:file_path>/', download_file, name='download_file'),

]
