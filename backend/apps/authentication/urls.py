from .views import ActivateUserView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('activate/<str:token>', ActivateUserView.as_view(), name='auth_activate_user'),
]