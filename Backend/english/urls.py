from django.urls import path
from .views import correct_writing, practice_english

urlpatterns = [
    path("correct-writing", correct_writing, name="correct-writing"),
    path("practice-english/", practice_english, name="practice-english"),

]
