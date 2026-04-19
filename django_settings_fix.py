# Add this to your Django settings.py file

# Option 1: Allow embedding from any site (less secure)
# X_FRAME_OPTIONS = 'ALLOWALL'

# Option 2: Allow embedding from same origin only
# X_FRAME_OPTIONS = 'SAMEORIGIN'

# Option 3: Remove the header completely (not recommended for production)
# X_FRAME_OPTIONS = None

# Option 4: Custom middleware to allow specific domains
# Create a new middleware file: middleware.py
class CustomXFrameOptionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Allow embedding from your portfolio domain and localhost for development
        allowed_domains = [
            'http://localhost:5173',
            'https://localhost:5173', 
            'http://127.0.0.1:5173',
            'https://127.0.0.1:5173',
            # Add your portfolio domain when deployed
            'https://your-portfolio-domain.com'
        ]
        
        # Check if the request is coming from an allowed domain
        referer = request.META.get('HTTP_REFERER', '')
        if any(domain in referer for domain in allowed_domains):
            response['X-Frame-Options'] = 'ALLOWFROM ' + referer
        else:
            # Default behavior for other domains
            response['X-Frame-Options'] = 'DENY'
        
        return response

# Then in settings.py, replace:
# 'django.middleware.clickjacking.XFrameOptionsMiddleware'
# with:
# 'your_app.middleware.CustomXFrameOptionsMiddleware'
