from rest_framework import serializers
from .models import PostBlog


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostBlog
        fields = ('title', 'url', 'text', 'img', 'created_at')