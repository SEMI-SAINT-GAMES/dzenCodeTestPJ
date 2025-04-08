import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer


class BaseConsumer(AsyncWebsocketConsumer):
    group_name = ""

    async def connect(self):
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        message = json.loads(text_data).get('message')
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': self.event_type,
                'message': message
            }
        )

    async def send_event(self, event):
        await self.send(text_data=json.dumps({'data': event['data']}))

    @classmethod
    def send_data(cls, data):
        async_to_sync(get_channel_layer().group_send)(
            cls.group_name,
            {
                "type": cls.event_type,
                "data": data,
            }
        )


class PostConsumer(BaseConsumer):
    group_name = "posts_group"
    event_type = "new_post"

    async def new_post(self, event):
        await self.send_event(event)

    @classmethod
    def send_new_post(cls, data):
        cls.send_data(data)


class CommentConsumer(BaseConsumer):
    group_name = "comments_group"
    event_type = "new_comment"

    async def new_comment(self, event):
        await self.send_event(event)

    @classmethod
    def send_new_comment(cls, data):
        cls.send_data(data)
