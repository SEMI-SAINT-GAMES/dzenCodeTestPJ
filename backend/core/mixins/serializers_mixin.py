import os
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from core.helpers.clean_html import clean_html
from PIL import Image
from io import BytesIO


class CommentsCountMixin:
    def get_comments_count(self, obj):
        return obj.comments.count()

class FileValidationMixin:

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
                value = InMemoryUploadedFile(
                    temp_file,
                    None,
                    value.name,
                    f'image/{extension[1:]}',
                    temp_file.tell(),
                    None
                )
        return value

    def validate_text_file(self, value):
        if value:
            if not value.name.endswith('.txt'):
                raise serializers.ValidationError("Only .txt files are allowed.")
            if value.size > 102400:
                raise serializers.ValidationError("File size exceeds 100KB.")
        return value
