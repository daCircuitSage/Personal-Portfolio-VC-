# Django Settings Update for Pacific Mart
# Add these lines to your settings.py file in your Django project

# Option 1: Allow embedding from any site (simplest)
X_FRAME_OPTIONS = 'ALLOWALL'

# OR Option 2: Allow from same origin only
# X_FRAME_OPTIONS = 'SAMEORIGIN'

# OR Option 3: Remove header completely
# X_FRAME_OPTIONS = None

# After adding this, redeploy your Django app to Render
# Then the live preview will work in your portfolio iframe
