from django.db import models

from core.models import BaseModel
from core.services.upload_files_service import upload_picture_to_post, upload_text_file_to_post, \
    upload_picture_to_comment, upload_text_file_to_comment


# Create your models here.


class PostsModel(BaseModel):
    class Meta:
        db_table = 'posts'
        ordering = ['id']

    text = models.TextField()
    username = models.CharField(max_length=50)
    email = models.EmailField()
    image = models.ImageField(upload_to=upload_picture_to_post, null=True, blank=True)
    text_file = models.FileField(upload_to=upload_text_file_to_post, null=True, blank=True)
    user = models.ForeignKey('users.UserModel', on_delete=models.CASCADE, related_name='posts', null=True, blank=True)
    is_active = models.BooleanField(default=True)

class CommentsModel(BaseModel):
    class Meta:
        db_table = 'comments'
        ordering = ['id']

    text = models.TextField()
    post = models.ForeignKey(PostsModel, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    username = models.CharField(max_length=50)
    email = models.EmailField()
    image = models.ImageField(upload_to=upload_picture_to_comment, null=True, blank=True)
    text_file = models.FileField(upload_to=upload_text_file_to_comment, null=True, blank=True)
    user = models.ForeignKey('users.UserModel', on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    is_active = models.BooleanField(default=True)
