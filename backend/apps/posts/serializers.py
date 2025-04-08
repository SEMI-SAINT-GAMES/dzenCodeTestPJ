import os
from io import BytesIO

from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from apps.posts.models import PostsModel, CommentsModel
from core.helpers.clean_html import clean_html
from PIL import Image


class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostsModel
        fields = ['id', 'text', 'username', 'email', 'user', 'created_at', 'image', 'text_file']
        read_only_fields = ['id', 'user', 'created_at']

    def validate_text(self, value):
        clean_text = clean_html(value)
        if not clean_text:
            raise ValidationError("Incorrect text format")
        return clean_text

    def validate_image(self, value):
        if value:
            valid_formats = ['.jpg', '.jpeg', '.png', '.gif']
            extension = os.path.splitext(value.name)[1].lower()
            if extension not in valid_formats:
                raise serializers.ValidationError("File not in JPG, GIF, PNG.")
            image = Image.open(value)
            width, height = image.size
            if width > 320 or height > 240:
                image.thumbnail((320, 240))
                temp_file = BytesIO()
                image.save(temp_file, format="JPEG" if extension == '.jpg' else extension[1:].upper())
                temp_file.seek(0)
                value = InMemoryUploadedFile(temp_file, None, value.name, f'image/{extension[1:]}', temp_file.tell(),None)
        return value

    def validate_text_file(self, value):
        if value:
            if not value.name.endswith('.txt'):
                raise serializers.ValidationError("Only .txt files are allowed.")
            if value.size > 102400:
                raise serializers.ValidationError("File size exceeds 100KB.")

        return value

class CommentCreateSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'post', 'parent', 'username', 'email', 'user', 'is_active', 'created_at', 'replies', 'image', 'text_file']
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
    def validate_image(self, value):
        if value:
            valid_formats = ['.jpg', '.jpeg', '.png', '.gif']
            extension = os.path.splitext(value.name)[1].lower()
            if extension not in valid_formats:
                raise serializers.ValidationError("File not in JPG, GIF, PNG.")
            image = Image.open(value)
            width, height = image.size
            if width > 320 or height > 240:
                image.thumbnail((320, 240))
                temp_file = BytesIO()
                image.save(temp_file, format="JPEG" if extension == '.jpg' else extension[1:].upper())
                temp_file.seek(0)
                value = InMemoryUploadedFile(temp_file, None, value.name, f'image/{extension[1:]}', temp_file.tell(),None)
        return value

    def validate_text_file(self, value):
        if value:
            if not value.name.endswith('.txt'):
                raise serializers.ValidationError("Only .txt files are allowed.")
            if value.size > 102400:
                raise serializers.ValidationError("File size exceeds 100KB.")

        return value

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
    image = serializers.ImageField(source='image.url', read_only=True)
    text_file = serializers.FileField(source='text_file.url', read_only=True)
    class Meta:
        model = PostsModel
        fields = ['id', 'text', 'username', 'email', 'comments', 'image', 'text_file', 'created_at']