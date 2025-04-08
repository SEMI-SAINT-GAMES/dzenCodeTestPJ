import os
from uuid import uuid1

from core.dataclasses.post_dataclass import PostDataClass, CommentDataClass


def upload_picture_to_post(instance:PostDataClass, file: str)->str:
    ext = file.split('.')[-1]
    return os.path.join('posts', 'picture', f'{instance.username}-{instance.email}',  f'{uuid1()}.{ext}')

def upload_text_file_to_post(instance:PostDataClass, file: str)->str:
    ext = file.split('.')[-1]
    return os.path.join('posts', 'text_files', f'{instance.username}-{instance.email}', f'{uuid1()}.{ext}')
def upload_picture_to_comment(instance:CommentDataClass, file: str)->str:
    ext = file.split('.')[-1]
    return os.path.join('comments', 'picture', f'{instance.username}-{instance.email}', f'{uuid1()}.{ext}')
def upload_text_file_to_comment(instance:CommentDataClass, file: str)->str:
    ext = file.split('.')[-1]
    return os.path.join('comments', 'text_files', f'{instance.username}-{instance.email}', f'{uuid1()}.{ext}')