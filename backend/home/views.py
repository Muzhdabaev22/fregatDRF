from rest_framework import viewsets
from .models import PostBlog
from .serializers import BlogSerializer
from rest_framework.pagination import PageNumberPagination

class BlogAPIListPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class BlogAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = PostBlog.objects.all().order_by("-created_at")
    serializer_class = BlogSerializer
    pagination_class = BlogAPIListPagination
    