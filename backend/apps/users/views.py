from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from apps.users.models import UserModel
from apps.users.serializers import UserSerializer
from core.services.email_service import EmailService


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class GetUsersView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        me = self.request.user
        queryset = UserModel.objects.exclude(id=me.id)
        return queryset

class UserVerifyEmailView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    def patch(self, *args, **kwargs):
        user = self.request.user
        if user.is_verified_email:
            return Response({"details": 'already verified'}, status.HTTP_306_RESERVED)
        data = self.request.data
        email = data.get('email')
        all_emails = UserModel.objects.exclude(id=user.id).values_list('email', flat=True)
        if email in all_emails:
            return Response({"details": 'email already exist'}, status.HTTP_409_CONFLICT)
        user.email = email
        user.save()
        EmailService.activate_email(user, email)
        return Response(email, status.HTTP_200_OK)