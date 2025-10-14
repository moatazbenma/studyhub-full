# bookings/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ClassBooking(models.Model):
    SLOT_CHOICES = [
        ("Mon, 7 Oct - 5 PM", "Mon, 7 Oct - 5 PM"),
        ("Wed, 9 Oct - 3 PM", "Wed, 9 Oct - 3 PM"),
        ("Fri, 11 Oct - 4 PM", "Fri, 11 Oct - 4 PM"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    slot = models.CharField(max_length=50, choices=SLOT_CHOICES)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.slot}"
