from rest_framework import viewsets
from .models import PostBlog, Movie, Episode
from .serializers import BlogSerializer, ContactSerializer, CinemaSerializer, EpisodeDetailSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.core.mail import BadHeaderError
from django.shortcuts import get_object_or_404


class BlogAPIListPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class BlogAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = PostBlog.objects.all().order_by("-created_at")
    serializer_class = BlogSerializer
    pagination_class = BlogAPIListPagination


class CinemaAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = CinemaSerializer


class EpisodeDetailAPIView(APIView):
    def get(self, request, episode_url):
        episode = get_object_or_404(Episode, url=episode_url)
        serializer = EpisodeDetailSerializer(episode)
        return Response(serializer.data)


class ContactAPIView(APIView):
    
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            try:
                name = serializer.validated_data['name']
                social = serializer.validated_data['social']
                
                send_mail('С вами хотят связаться!', f"{name}. {social}", 'edik622mujpc@gmail.com', ['edik622mujpc@gmail.com'])
                return Response({'success': 'Письмо отправлено'}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({'error': f'Ошибка отправки письма: {str(e)}'}, status=status.HTTP_500_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

