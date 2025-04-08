from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from apps.users.serializers import UserSerializer
from core.services.jwt_service import JWTService, ActivateToken

UserModel = get_user_model()
class ActivateUserView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, *args, **kwargs):
        token = kwargs['token']
        user = JWTService.validate_token(token, ActivateToken)
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)

class MeView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)  # Разрешає часткове оновлення
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
