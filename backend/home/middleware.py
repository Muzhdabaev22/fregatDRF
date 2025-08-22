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
            # Добавляем заголовки CORS для медиафайлов
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With'
        
        # Добавляем заголовки CORS для изображений
        elif request.path.startswith('/media/') and (
            request.path.endswith('.jpg') or 
            request.path.endswith('.jpeg') or 
            request.path.endswith('.png') or
            request.path.endswith('.gif') or
            request.path.endswith('.webp')
        ):
            response['Cache-Control'] = 'public, max-age=31536000'
            # Добавляем заголовки CORS для изображений
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With'
        
        return response
