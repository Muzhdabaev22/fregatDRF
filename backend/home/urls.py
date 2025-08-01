from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogAPIView

router = DefaultRouter()
router.register(r'blog', BlogAPIView, basename='blog')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]

