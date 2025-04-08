from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from apps.posts.models import PostsModel, CommentsModel
from core.helpers.clean_html import clean_html


class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostsModel
        fields = ['text', 'username', 'email', 'user']

    def validate_text(self, value):
        clean_text = clean_html(value)
        if not clean_text:
            raise ValidationError("Incorrect text format")
        return clean_text

class CommentCreateSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'post', 'parent', 'username', 'email', 'user', 'is_active', 'created_at', 'replies']
        read_only_fields = ['id', 'user', 'created_at', 'replies']

    def get_replies(self, obj):
        replies = obj.replies.filter(is_active=True)
        return CommentCreateSerializer(replies, many=True).data

    def validate_parent(self, data):
        if data.parent and data.post:
            if data['parent'].post != data['post']:
                raise serializers.ValidationError("Parent comment does not belong to this post")
        return data

    def validate_text(self, value):
        clean_text = clean_html(value)
        if not clean_text:
            raise ValidationError("Incorrect text format")
        return clean_text

class RecursiveCommentSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = CommentSerializer(value, context=self.context)
        return serializer.data


class CommentSerializer(serializers.ModelSerializer):
    replies = RecursiveCommentSerializer(many=True, read_only=True)

    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'username', 'email', 'replies']

class PostWithCommentsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = PostsModel
        fields = ['id', 'text', 'username', 'email', 'comments']