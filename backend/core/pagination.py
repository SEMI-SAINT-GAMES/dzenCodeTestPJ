import math

from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PagePagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        total_pages = math.ceil(count/self.get_page_size(self.request))
        return Response({
            'current_page': self.page.number,
            'total_items': count,
            'total_pages': total_pages,
            'prev': self.get_previous_link() if self.get_previous_link() else False,
            'next': self.get_next_link() if self.get_next_link() else False,
            'results': data
        }, status.HTTP_200_OK)

class PostsPagination(PagePagination):
    page_size = 25

class CommentsPagination(PagePagination):
    page_size = 5

