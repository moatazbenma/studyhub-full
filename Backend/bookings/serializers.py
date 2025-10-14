# bookings/serializers.py
from rest_framework import serializers
from .models import ClassBooking

class ClassBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassBooking
        fields = ["id", "user", "slot", "booked_at"]
        read_only_fields = ["id", "user", "booked_at"]
