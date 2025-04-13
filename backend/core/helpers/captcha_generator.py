import os
import random, string
from functools import wraps

from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64

from django.core.cache import cache
from rest_framework import status
from rest_framework.response import Response

from configs.settings import BASE_DIR

CAPTCHA_FONT_PATH = os.path.join(BASE_DIR, 'core', 'fonts', 'Moms_typewriter.ttf')

def generate_captcha_text(length=5):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def generate_captcha_image(text: str):
    width, height = 150, 50
    image = Image.new('RGB', (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(image)
    try:
        font = ImageFont.truetype(CAPTCHA_FONT_PATH, 32)
    except IOError:
        font = ImageFont.load_default()

    draw.text((10, 5), text, font=font, fill=(0, 0, 0))

    buffer = BytesIO()
    image.save(buffer, format='PNG')
    buffer.seek(0)
    encoded_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
    return encoded_image

def validate_captcha(view_func):
    @wraps(view_func)
    def _wrapped_view(self, request, *args, **kwargs):
        captcha_id = request.data.get("captcha_id")
        captcha_text = request.data.get("captcha_text")
        if not captcha_id or not captcha_text:
            return Response({"detail": "Captcha data missing"}, status=status.HTTP_400_BAD_REQUEST)

        captcha_key = cache.get(f"captcha_{captcha_id}")
        if captcha_key is None:
            return Response({"detail": "Captcha expired"}, status=status.HTTP_400_BAD_REQUEST)
        if captcha_key != captcha_text:
            return Response({"detail": "Invalid captcha"}, status=status.HTTP_400_BAD_REQUEST)

        return view_func(self, request, *args, **kwargs)
    return _wrapped_view