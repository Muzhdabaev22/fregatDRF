class MediaFileMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Добавляем заголовки для видео и аудио файлов
        if request.path.startswith('/media/') and (
            request.path.endswith('.mp4') or 
            request.path.endswith('.webm') or 
            request.path.endswith('.avi') or
            request.path.endswith('.mov') or
            request.path.endswith('.mkv') or
            request.path.endswith('.mp3') or
            request.path.endswith('.wav') or
            request.path.endswith('.ogg')
        ):
            response['Accept-Ranges'] = 'bytes'
            response['Cache-Control'] = 'public, max-age=31536000'
        
        return response
