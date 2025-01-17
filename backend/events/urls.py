from django.urls import path
from .views import get_trending_events

urlpatterns = [
    path('api/trending-events/', get_trending_events, name='get_trending_events'),
]
