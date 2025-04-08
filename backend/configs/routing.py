from django.urls import re_path
from apps.posts import consumers
from apps.posts.routing import websocket_urlpatterns as posts_routing

websocket_urlpatterns = [
    re_path(r'ws/posts/', consumers.PostConsumer.as_asgi()),
]