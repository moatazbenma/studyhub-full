from django.urls import path
from .views import DashboardView, UpdateEnglishProgressView

urlpatterns = [
    path("", DashboardView.as_view(), name="dashboard"),
    path("update-progress/", UpdateEnglishProgressView.as_view(), name="update-english-progress"),

]