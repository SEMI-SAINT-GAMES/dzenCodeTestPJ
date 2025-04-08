import json
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.posts.models import PostsModel
from apps.posts.serializers import PostCreateSerializer, CommentCreateSerializer, PostWithCommentsSerializer
from core.pagination import PagePagination


# Create your views here.
class CreatePostAPIView(GenericAPIView):
    serializer_class = PostCreateSerializer
    permission_classes = (AllowAny,)
    def post(self, request):
        try:
            data = json.loads(request.body)
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                if self.request.user.is_authenticated:
                    serializer.validated_data['user'] = self.request.user
                    email = self.request.user.email
                    username = self.request.user.username
                else:
                    email = data.get('email')
                    username = data.get('username')
                post = serializer.save(is_active=True)
                return Response({
                    "message": "Post created successfully",
                    "post": {
                        "id": post.id,
                        "username": username,
                        "email": email,
                        "text": post.text,
                        "created_at": post.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    },
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)

class GetPostsAPIView(ListAPIView):
    queryset = PostsModel.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = PostCreateSerializer
    permission_classes = (AllowAny,)
    pagination_class = PagePagination

class CreateCommentAPIView(GenericAPIView):
    serializer_class = CommentCreateSerializer
    permission_classes = (AllowAny, )
    def post(self, request):
        try:
            data = json.loads(request.body)
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                if self.request.user.is_authenticated:
                    serializer.validated_data['user'] = self.request.user
                    email = self.request.user.email
                    username = self.request.user.username
                else:
                    email = data.get('email')
                    username = data.get('username')
                comment = serializer.save(is_active=True)
                return Response({
                    "message": "Comment created successfully",
                    "comment": {
                        "id": comment.id,
                        "username": username,
                        "email": email,
                        "text": comment.text,
                        "post_id": comment.post.id,
                        "parent_id": comment.parent.id if comment.parent else None,
                        "created_at": comment.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    },
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)

class PostWithCommentsView(ListAPIView):
    queryset = PostsModel.objects.all()
    serializer_class = PostWithCommentsSerializer
    pagination_class = PagePagination
    permission_classes = (AllowAny,)