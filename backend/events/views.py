from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import datetime
from events.models import GlobalEvent
from .serializers import GlobalEventSerializer
import pytz  # To handle timezone

@api_view(['GET'])
def get_trending_events(request):
    # Fetch all events
    events = GlobalEvent.objects.all()

    # Sort events by priority score
    sorted_events = sorted(events, key=lambda x: (
        x.get_event_priority_score(),
        # Convert event date to naive datetime (if it's aware, remove tzinfo)
        x.date.replace(tzinfo=None) if x.date.tzinfo else x.date
    ), reverse=True)

    # Serialize the events
    serializer = GlobalEventSerializer(sorted_events, many=True)
    return Response(serializer.data)
