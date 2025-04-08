import json
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.posts.models import PostsModel
from apps.posts.serializers import PostCreateSerializer, CommentCreateSerializer, PostWithCommentsSerializer
from core.pagination import PagePagination


# Create your views here.
class CreatePostAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            if self.request.user.is_authenticated:
                serializer.validated_data['user'] = self.request.user
                serializer.email = self.request.user.email
                serializer.username = self.request.user.username
            else:
                serializer.email = request.data.get('email')
                serializer.username = request.data.get('username')
            serializer.save(is_active=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetPostsAPIView(ListAPIView):
    queryset = PostsModel.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = PostCreateSerializer
    permission_classes = (AllowAny,)
    pagination_class = PagePagination

class CreateCommentAPIView(GenericAPIView):
    permission_classes = (AllowAny, )
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        serializer = CommentCreateSerializer(data=request.data)
        if serializer.is_valid():
            if self.request.user.is_authenticated:
                serializer.validated_data['user'] = self.request.user
                serializer.email = self.request.user.email
                serializer.username = self.request.user.username
            else:
                serializer.email = request.data.get('email')
                serializer.username = request.data.get('username')
            comment = serializer.save(is_active=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostWithCommentsAPIView(ListAPIView):
    queryset = PostsModel.objects.all()
    serializer_class = PostWithCommentsSerializer
    pagination_class = PagePagination
    permission_classes = (AllowAny,)