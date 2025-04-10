from rest_framework import serializers
from apps.posts.models import PostsModel, CommentsModel
from core.mixins.serializers_mixin import FileValidationMixin, CommentsCountMixin


class PostCreateSerializer(CommentsCountMixin, FileValidationMixin, serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    text_file = serializers.FileField(required=False)
    comments_count = serializers.SerializerMethodField()
    class Meta:
        model = PostsModel
        fields = ['id', 'text', 'username', 'email', 'created_at', 'image', 'text_file', 'comments_count']
        read_only_fields = ['id', 'user', 'created_at']


class CommentCreateSerializer(FileValidationMixin, serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'parent', 'username', 'email', 'user', 'is_active', 'created_at', 'comments', 'image', 'text_file']
        read_only_fields = ['id', 'user', 'created_at', 'comments']

    def get_comments(self, obj):
        comments = obj.comments.filter(is_active=True)
        return CommentCreateSerializer(comments, many=True).data

class CommentRepresentationSerializer(CommentsCountMixin, serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField()
    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'username', 'email', 'post', 'parent', 'created_at', 'image', 'text_file', 'comments_count']



class RecursiveCommentSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = CommentSerializer(value, context=self.context)
        return serializer.data


class CommentSerializer(serializers.ModelSerializer):
    comments = RecursiveCommentSerializer(many=True, read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'username', 'email', 'post', 'comments', 'parent']

class PostWithCommentsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    image = serializers.ImageField(read_only=True)
    text_file = serializers.FileField(read_only=True)
    class Meta:
        model = PostsModel
        fields = ['id', 'text', 'username', 'email', 'comments', 'image', 'text_file', 'created_at']