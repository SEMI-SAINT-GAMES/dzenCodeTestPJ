from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core import validators as V

from .managers import UserManager
from core.enums.regex_enum import RegEx
from core.models import BaseModel


class ProfileModel(BaseModel):
    class Meta:
        db_table = 'profile'
    name = models.CharField(max_length=50, validators=[V.RegexValidator(RegEx.USER_NAME.__str__(), RegEx.USER_NAME.error_message())])
    surname = models.CharField(max_length=50, validators=[V.RegexValidator(RegEx.USER_SURNAME.__str__(), RegEx.USER_SURNAME.error_message())])


class UserModel(AbstractBaseUser, PermissionsMixin, BaseModel):
    class Meta:
        db_table = 'auth_user'
        ordering = ['id']
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    username = models.CharField(max_length=50, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    profile = models.OneToOneField(ProfileModel, on_delete=models.CASCADE, related_name='user', null=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()
