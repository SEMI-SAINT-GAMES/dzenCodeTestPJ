from channels.routing import URLRouter
from django.urls import re_path
from apps.posts.routing import websocket_urlpatterns as posts_routing

websocket_urlpatterns = [
    re_path(r'ws/', URLRouter(posts_routing))
]