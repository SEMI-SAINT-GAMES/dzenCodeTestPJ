from django.db import models

from core.models import BaseModel


# Create your models here.


class PostsModel(BaseModel):
    class Meta:
        db_table = 'posts'
        ordering = ['id']

    text = models.TextField()
    username = models.CharField(max_length=50)
    email = models.EmailField()
    user = models.ForeignKey('users.UserModel', on_delete=models.CASCADE, related_name='posts', null=True, blank=True)
    is_active = models.BooleanField(default=True)

class CommentsModel(BaseModel):
    class Meta:
        db_table = 'comments'
        ordering = ['id']

    text = models.TextField()
    post = models.ForeignKey(PostsModel, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    username = models.CharField(max_length=50)
    email = models.EmailField()
    user = models.ForeignKey('users.UserModel', on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    is_active = models.BooleanField(default=True)
