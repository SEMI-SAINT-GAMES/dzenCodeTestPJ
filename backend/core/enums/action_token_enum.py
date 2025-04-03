from datetime import timedelta
from enum import Enum


class ActionTokenEnum(Enum):
    ACTIVATE = (
        'activate',
        timedelta(minutes=30)
    )
    EMAIL_VERIFY = (
        'email_verify',
        timedelta(minutes=30)
    )
    PASSWORD_RECOVERY = (
        'password_recovery',
        timedelta(minutes=10)
    )

    def __init__(self, token_type, life_time):
        self.token_type = token_type
        self.life_time = life_time
