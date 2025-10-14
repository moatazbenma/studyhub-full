# bookings/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ClassBooking
from .serializers import ClassBookingSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def book_class(request):
    slot = request.data.get("slot")
    if not slot:
        return Response({"error": "Please select a slot."}, status=status.HTTP_400_BAD_REQUEST)

    # Prevent double booking
    if ClassBooking.objects.filter(user=request.user, slot=slot).exists():
        return Response({"error": "You already booked this slot."}, status=status.HTTP_400_BAD_REQUEST)

    booking = ClassBooking.objects.create(user=request.user, slot=slot)
    serializer = ClassBookingSerializer(booking)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_bookings(request):
    bookings = ClassBooking.objects.filter(user=request.user)
    serializer = ClassBookingSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_booking(request, id):
    try:
        booking = ClassBooking.objects.get(id=id, user=request.user)
        booking.delete()
        return Response({"detail": "Booking deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except ClassBooking.DoesNotExist:
        return Response({"detail": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)