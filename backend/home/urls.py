from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogAPIView, ContactAPIView, CinemaAPIView, EpisodeDetailAPIView


router = DefaultRouter()
router.register(r'blog', BlogAPIView, basename='blog')
router.register(r'cinema', CinemaAPIView, basename='cinema')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/contact/', ContactAPIView.as_view(), name='contact'),
    path('api/v1/episodes/<str:episode_url>/', EpisodeDetailAPIView.as_view(), name='episode-detail'),
]

