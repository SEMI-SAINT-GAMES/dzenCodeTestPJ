from django.urls import re_path
from apps.posts import consumers

websocket_urlpatterns = [
    re_path(r'posts/', consumers.PostConsumer.as_asgi()),
    re_path(r'comments/', consumers.CommentConsumer.as_asgi()),
]