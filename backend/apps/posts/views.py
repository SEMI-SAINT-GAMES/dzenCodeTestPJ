import json

from channels.layers import get_channel_layer
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.posts.consumers import PostConsumer, CommentConsumer
from apps.posts.models import PostsModel, CommentsModel
from apps.posts.serializers import PostCreateSerializer, CommentCreateSerializer, PostWithCommentsSerializer
from core.pagination import PagePagination


# Create your views here.
class CreatePostAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    serializer_class = PostCreateSerializer
    def post(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if self.request.user.is_authenticated:
                serializer.validated_data['user'] = self.request.user
                serializer.email = self.request.user.email
                serializer.username = self.request.user.username
            else:
                serializer.email = request.data.get('email')
                serializer.username = request.data.get('username')

            new_post = serializer.save(is_active=True)
            post_data = serializer.to_representation(new_post)
            post_data['created_at'] = new_post.created_at.isoformat()
            PostConsumer.send_new_post(post_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetPostsAPIView(ListAPIView):
    queryset = PostsModel.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = PostCreateSerializer
    permission_classes = (AllowAny,)
    pagination_class = PagePagination


class CreateCommentAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, post_id, parent_id=None):
        try:
            post = PostsModel.objects.get(id=post_id)
        except PostsModel.DoesNotExist:
            return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        parent = None
        if parent_id:
            try:
                parent = CommentsModel.objects.get(id=parent_id, post=post)
            except CommentsModel.DoesNotExist:
                return Response({"detail": "Parent comment not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CommentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['post'] = post
            if parent:
                serializer.validated_data['parent'] = parent
            serializer.save(is_active=True)
            data = PostWithCommentsSerializer(post).data
            CommentConsumer.send_new_comment(data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostWithCommentsAPIView(ListAPIView):
    queryset = PostsModel.objects.all().order_by('-created_at')
    serializer_class = PostWithCommentsSerializer
    pagination_class = PagePagination
    permission_classes = (AllowAny,)