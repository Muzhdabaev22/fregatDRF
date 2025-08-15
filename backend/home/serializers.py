from rest_framework import serializers
from .models import PostBlog, Movie, Episode, Level, Accent, Topic, Author, Vocabulary, TestCinema, DiscusBoard, SubStory, RightOrder

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

class VocabularySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vocabulary
        fields = ('id', 'word')

class TestCinemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCinema
        fields = ('id', 'question', 'first', 'second', 'third', 'correct')

class DiscusBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscusBoard
        fields = ('id', 'question')

class SubStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubStory
        fields = ('id', 'image', 'bef_one', 'bef_two', 'bef_three', 'aft_one', 'aft_two', 'aft_three')
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        if request and data['image']:
            data['image'] = request.build_absolute_uri(data['image'])
        return data

class RightOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = RightOrder
        fields = ('id', 'question', 'priority')

class EpisodeDetailSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=True, read_only=True)
    accent = AccentSerializer(many=True, read_only=True)
    topic = TopicSerializer(many=True, read_only=True)
    author = AuthorSerializer(many=True, read_only=True)
    vocabulary = VocabularySerializer(many=True, read_only=True, source='vocabulary_set')
    test = TestCinemaSerializer(many=True, read_only=True, source='testcinema_set')
    order = RightOrderSerializer(many=True, read_only=True, source='rightorder_set')
    discus = DiscusBoardSerializer(many=True, read_only=True, source='discusboard_set')
    story = SubStorySerializer(many=True, read_only=True, source='substory_set')
    
    class Meta:
        model = Episode
        fields = ('id', 'title', 'number_epis', 'img', 'url', 'level', 'accent', 'topic', 'author', 'video', 'script', 'vocabulary', 'test', 'order', 'discus', 'story')
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        if request:
            # Формируем полные URL для изображений и видео
            if data['img']:
                data['img'] = request.build_absolute_uri(data['img'])
            if data['video']:
                data['video'] = request.build_absolute_uri(data['video'])
        return data

class EpisodeSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=True, read_only=True)
    
    class Meta:
        model = Episode
        fields = ('id', 'title', 'number_epis', 'img', 'url', 'level')
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        if request and data['img']:
            data['img'] = request.build_absolute_uri(data['img'])
        return data

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostBlog
        fields = ('id', 'title', 'url', 'text', 'img', 'created_at')
        read_only_fields = ['created_at']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        if request and data['img']:
            data['img'] = request.build_absolute_uri(data['img'])
        return data


class CinemaSerializer(serializers.ModelSerializer):
    episodes = EpisodeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = ('id', 'title', 'img', 'episodes', 'level')
        read_only_fields = ['created_at']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        if request and data['img']:
            data['img'] = request.build_absolute_uri(data['img'])
        return data


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    social = serializers.CharField(max_length=255)