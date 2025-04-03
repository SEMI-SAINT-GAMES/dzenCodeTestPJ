import os

from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives

from core.dataclasses.user_dataclass import UserDataClass
from core.services.jwt_service import JWTService, ActivateToken, PasswordRecoveryToken, EmailVerifyToken


class EmailService:
    @staticmethod
    def __send_email(to:str, template_name:str, context:dict, subject=''):
        template = get_template(template_name)
        html_content = template.render(context)
        msg = EmailMultiAlternatives(subject, from_email=os.environ.get('EMAIL_HOST_USER'), to=[to])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()
    @classmethod
    def test_email(cls):
        cls.__send_email('vadik505050@gmail.com', 'test_email.html', {}, 'Hello')
    @classmethod
    def register_email(cls, user:UserDataClass):
        token = JWTService.create_token(user, ActivateToken)
        url = f'http://localhost:3000/activate/{token}'
        cls.__send_email(
            user.email,
            'register.html',
            {'name':user.profile.name, 'url':url},
            'Register'
        )

    @classmethod
    def activate_email(cls, user: UserDataClass, email: str):
        token = JWTService.create_token(user, EmailVerifyToken)
        url = f'http://localhost:3000/activate_email/{token}'
        cls.__send_email(
            email,
            'activate_email.html',
            {'name': user.profile.name, 'url': url},
            'Активація пошти'
        )
    @classmethod
    def recovery_password(cls, user:UserDataClass):
        token = JWTService.create_token(user, PasswordRecoveryToken)
        url = f'http://localhost:3000/password_recovery/{token}'
        cls.__send_email(
            user.email,
            'password_recovery.html',
            {'name': user.profile.name, 'url': url},
            'Password Recovery'
        )