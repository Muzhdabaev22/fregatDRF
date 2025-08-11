from rest_framework import serializers
from .models import PostBlog, Movie, Episode, Level, Accent, Topic, Author

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ('id', 'level')

class AccentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accent
        fields = ('id', 'accent')

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'topic')

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'url')

class EpisodeDetailSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=True, read_only=True)
    accent = AccentSerializer(many=True, read_only=True)
    topic = TopicSerializer(many=True, read_only=True)
    author = AuthorSerializer(many=True, read_only=True)
    
    class Meta:
        model = Episode
        fields = ('id', 'title', 'number_epis', 'img', 'url', 'level', 'accent', 'topic', 'author', 'video', 'script')

class EpisodeSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=True, read_only=True)
    
    class Meta:
        model = Episode
        fields = ('id', 'title', 'number_epis', 'img', 'url', 'level')

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostBlog
        fields = ('id', 'title', 'url', 'text', 'img', 'created_at')
        read_only_fields = ['created_at']


class CinemaSerializer(serializers.ModelSerializer):
    episodes = EpisodeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = ('id', 'title', 'img', 'episodes', 'level')
        read_only_fields = ['created_at']


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    social = serializers.CharField(max_length=255)