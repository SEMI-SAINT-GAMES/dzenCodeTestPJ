import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer


def send_new_post(post_data):
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        "posts_group",
        {
            "type": "new_post",
            "data": post_data,
        }
    )
class PostConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'posts_group'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'new_post',
                'message': message
            }
        )
    async def new_post(self, event):
        post_data = event['data']
        print('postdata', post_data)
        await self.send(text_data=json.dumps({
            'data': post_data
        }))

