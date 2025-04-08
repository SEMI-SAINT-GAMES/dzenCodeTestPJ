import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer



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
        await self.send(text_data=json.dumps({
            'data': post_data
        }))
    @classmethod
    def send_new_post(cls, post_data):
        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            "posts_group",
            {
                "type": "new_post",
                "data": post_data,
            }
        )

class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'comments_group'

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
                'type': 'new_comment',
                'message': message
            }
        )
    async def new_comment(self, event):
        comment_data = event['data']
        await self.send(text_data=json.dumps({
            'data': comment_data
        }))
    @classmethod
    def send_new_comment(cls, comment_data):
        channel_layer = get_channel_layer()
        print('commeeeeeent')
        async_to_sync(channel_layer.group_send)(
            "comments_group",
            {
                "type": "new_comment",
                "data": comment_data,
            }
        )