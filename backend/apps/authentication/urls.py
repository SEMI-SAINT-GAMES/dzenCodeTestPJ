from .views import ActivateUserView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='auth_login'),
    path('refresh', TokenRefreshView.as_view(), name='auth_refresh'),
    path('activate/<str:token>', ActivateUserView.as_view(), name='auth_activate_user'),
]