from django.db import models
from accounts.models import User

# Create your models here.



class Deck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)


class Card(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    front_text = models.CharField(max_length=200)
    back_text = models.CharField(max_length=200)
    status = models.CharField(max_length=200, choices=[("new", "New"), ("learning", "Learning"), ("mastered", "Mastered")], default="new")