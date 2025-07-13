from rest_framework import serializers
from .models import PostBlog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostBlog
        fields = ('id', 'title', 'url', 'text', 'img', 'created_at')
        read_only_fields = ['created_at']