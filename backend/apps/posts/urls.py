from core.helpers.file_download_service import download_file
from .views import CreatePostAPIView, GetPostsAPIView, CreateCommentAPIView, PostWithCommentsAPIView, GetMainCommentsAPIView, GetChildCommentsAPIView
from django.urls import path

urlpatterns = [
    path('create_post', CreatePostAPIView.as_view(), name='posts_create'),
    path('all_posts', GetPostsAPIView.as_view(), name='posts_get_all'),
    path('create_comment/<int:post_id>/main', CreateCommentAPIView.as_view(), name='create_comment'),
    path('create_comment/<int:post_id>/<int:parent_id>', CreateCommentAPIView.as_view(), name='create_reply_comment'),
    path('get_main_comments/<int:post_id>', GetMainCommentsAPIView.as_view(), name='get_main_comments'),
    path('get_child_comments/<int:parent_id>', GetChildCommentsAPIView.as_view(), name='get_child_comments'),
    path('post_with_comments', PostWithCommentsAPIView.as_view(), name='posts_get_post_with_comments'),
    path('download_file/<str:file_path>/', download_file, name='download_file'),

]
