from django.shortcuts import render
from .serializers import CardSerializer, DeckSerializer
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Deck, Card
# Create your views here.



class DeckViewSet(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Deck.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Card.objects.filter(deck__user=self.request.user)
        deck_id = self.request.query_params.get("deck")
        if deck_id:
            queryset = queryset.filter(deck_id=deck_id)
        return queryset


    def perform_create(self, serializer):
        deck = serializer.validated_data.get("deck")
        if deck.user != self.request.user:
            raise PermissionDenied("You can only add cards to your own decks.")
        
        serializer.save()