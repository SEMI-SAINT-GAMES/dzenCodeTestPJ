from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.transaction import atomic
from apps.users.models import ProfileModel
from core.services.email_service import EmailService
UserModel = get_user_model()
class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProfileModel
        fields = ('id', 'name', 'surname', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')




class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = UserModel
        fields = (
            'id', 'email', 'password', 'is_staff', 'is_superuser', 'is_active', 'created_at', 'updated_at', 'profile'
        )
        read_only_fields = ('id', 'is_staff', 'is_superuser', 'is_active', 'created_at', 'updated_at',)
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    @atomic
    def create(self, validated_data: dict):
        profile = validated_data.pop('profile')
        profile = ProfileModel.objects.create(**profile)
        user = UserModel.objects.create_user(profile=profile, **validated_data)
        EmailService.register_email(user)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile_serializer = ProfileSerializer(instance.profile, data=profile_data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()

        return super().update(instance, validated_data)