import re
from bs4 import BeautifulSoup

ALLOWED_TAGS = ["a", "code", "i", "strong"]
ALLOWED_ATTRS = {"a": ["href", "title"]}

TAG_REGEX = re.compile(r'<(?!\/?(a|code|i|strong)(\s|>))[^>]*>')

def clean_html(html):
    html = TAG_REGEX.sub("", html)

    soup = BeautifulSoup(html, "html.parser")

    for tag in soup.find_all():
        if tag.name not in ALLOWED_TAGS:
            tag.decompose()
        else:
            attrs = {key: val for key, val in tag.attrs.items() if key in ALLOWED_ATTRS.get(tag.name, [])}
            tag.attrs = attrs

    return str(soup)
