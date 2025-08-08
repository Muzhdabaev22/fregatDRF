from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogAPIView, ContactAPIView


router = DefaultRouter()
router.register(r'blog', BlogAPIView, basename='blog')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/contact/', ContactAPIView.as_view(), name='contact'),
]

