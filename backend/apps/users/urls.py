from django.urls import path
from .views import UserCreateView, GetUsersView

urlpatterns = [
    path('', UserCreateView.as_view(), name='users_create'),
    path('all', GetUsersView.as_view()),
    ]