# english/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class EnglishLessonProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson_id = models.IntegerField()  # or ForeignKey to Lesson model
    completed_steps = models.IntegerField(default=0)
    total_steps = models.IntegerField(default=0)
    quiz_score = models.IntegerField(default=0)
