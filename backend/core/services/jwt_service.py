from typing import Type

from django.contrib.auth import get_user_model
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.tokens import BlacklistMixin, Token

from core.enums.action_token_enum import ActionTokenEnum
from core.exeptions.jwt_exeption import JwtException

UserModel = get_user_model()
ActionTokenClassType = Type[BlacklistMixin | Token]

class ActionToken(BlacklistMixin, Token):
    pass

class ActivateToken(ActionToken):
    token_type = ActionTokenEnum.ACTIVATE.token_type
    lifetime = ActionTokenEnum.ACTIVATE.life_time
class EmailVerifyToken(ActionToken):
    token_type = ActionTokenEnum.EMAIL_VERIFY.token_type
    lifetime = ActionTokenEnum.EMAIL_VERIFY.life_time

class PasswordRecoveryToken(ActionToken):
    token_type = ActionTokenEnum.PASSWORD_RECOVERY.token_type
    lifetime = ActionTokenEnum.PASSWORD_RECOVERY.life_time
class JWTService:
    @staticmethod
    def create_token(user, token_class:ActionTokenClassType):
        return token_class.for_user(user)

    @staticmethod
    def validate_token(token, token_class:ActionTokenClassType):
        try:
            token_res = token_class(token)
            token_res.check_blacklist()
        except Exception:
            raise JwtException
        token_res.blacklist()
        user_id = token_res.payload.get('user_id')
        return get_object_or_404(UserModel, pk=user_id)


