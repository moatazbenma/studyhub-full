from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer
from .models import Task

# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user).order_by("due_date")
    

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)