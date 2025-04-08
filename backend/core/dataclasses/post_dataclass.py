from dataclasses import dataclass
from datetime import datetime

@dataclass
class PostDataClass:
    id: int
    text: str
    username: str
    email: str
    image: str
    text_file: str
    user_id: int
    created_at: datetime
    updated_at: datetime

@dataclass
class CommentDataClass:
    id: int
    text: str
    post_id: int
    parent_id: int
    username: str
    email: str
    image: str
    text_file: str
    user_id: int
    created_at: datetime
    updated_at: datetime
