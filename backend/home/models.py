from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

class PostBlog(models.Model):
    title = models.CharField(max_length=300)
    url = models.SlugField()
    text = CKEditor5Field("Текст", config_name='extends')
    img = models.ImageField("Изображение")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Accent(models.Model):
    accent = models.CharField("Имя", max_length=100)
   
    
    def __str__(self):
        return self.accent
    
    class Meta:
        verbose_name = "Акцент"
        verbose_name_plural = "Акценты"

class Topic(models.Model):
    topic = models.CharField("Имя", max_length=100)
    
    def __str__(self):
        return self.topic
    
    class Meta:
        verbose_name = "Тема"
        verbose_name_plural = "Темы"

class Level(models.Model):
    level = models.CharField("Уровень", max_length=10)
    
    def __str__(self):
        return self.level
    
    class Meta:
        verbose_name = "Уровень"
        verbose_name_plural = "Уровни"
        
class Author(models.Model):
    name = models.CharField("Имя", max_length=100)
    url = models.URLField("Ссылка на страницу")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"

class Episode(models.Model):
    title = models.CharField("Название", max_length=100, unique=True)
    number_epis = models.PositiveSmallIntegerField("Номер эпизода")
    img = models.ImageField("Изображение")
    url = models.SlugField("Ссылка")
    level = models.ManyToManyField(Level, verbose_name="Уровень", related_name="lvl_related")
    accent = models.ManyToManyField(Accent, verbose_name="Акцент", related_name="accent_related")
    topic = models.ManyToManyField(Topic, verbose_name="Тема", related_name="topic_related")
    author = models.ManyToManyField(Author, verbose_name="Автор", related_name="author_related")
    video = models.FileField("Видео", max_length=100)
    script = CKEditor5Field('Текст', config_name='extends') 
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Эпизод"
        verbose_name_plural = "Эпизоды"
        
        
class Movie(models.Model):
    title = models.CharField("Название фильма", max_length=100)
    img = models.ImageField("Изображение")
    episodes = models.ManyToManyField(Episode, verbose_name="Эпизод", related_name="ep_related")
    level = models.ManyToManyField(Level, verbose_name="Уровень", related_name="lvl_movie")
    
    def __str__(self):
        return self.title
    class Meta:
        verbose_name = "Фильм"
        verbose_name_plural = "Фильмы"
    

class Vocabulary(models.Model):
    episode = models.ForeignKey(Episode, null=True, on_delete=models.SET_NULL)
    word = models.CharField("Слово", max_length=200)
    
    def __str__(self) -> str:
        return f"{self.episode.title}"
    
    
class TestCinema(models.Model):
    
    episode = models.ForeignKey(Episode, null=True, on_delete=models.SET_NULL)
    question = models.CharField("Вопрос", max_length=200)
    first = models.CharField("Первый ответ", max_length=100)
    second = models.CharField("Второй ответ", max_length=100)
    third = models.CharField("Третий ответ", max_length=100)
    correct = models.SmallIntegerField("Правильный ответ")

    def __str__(self) -> str:
        return f"{self.episode.title}"
    

class DiscusBoard(models.Model):
    
    episode = models.ForeignKey(Episode, null=True, on_delete=models.SET_NULL)
    question = models.CharField("Вопрос", max_length=300)


    def __str__(self) -> str:
        return f"{self.episode.title}"
    
class SubStory(models.Model):
    
    episode = models.ForeignKey(Episode, null=True, on_delete=models.SET_NULL)
    
    image = models.ImageField("Изображение")
    
    bef_one = models.CharField("before first", max_length=200)
    bef_two = models.CharField("before second", max_length=200)
    bef_three = models.CharField("before third", max_length=200)
    
    aft_one = models.CharField("after first", max_length=200)
    aft_two = models.CharField("after second", max_length=200)
    aft_three = models.CharField("after third", max_length=200)
    
    def __str__(self) -> str:
        return f"{self.episode.title}"
    
class RightOrder(models.Model):
    episode = models.ForeignKey(Episode, null=True, on_delete=models.SET_NULL)
    
    question = models.CharField("Вопрос", max_length=200)
    priority = models.IntegerField("Приоритет")
    
    def __str__(self):
        return f"{self.episode.title}"
