from django.shortcuts import render
from rest_framework import generics
from .models import PostBlog
from .serializers import BlogSerializer

class BlogAPIView(generics.ListAPIView):
    queryset = PostBlog.objects.all().order_by("-created_at")
    serializer_class = BlogSerializer