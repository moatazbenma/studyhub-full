from rest_framework import serializers
from .models import Deck, Card




class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"
        read_only_fields = ("id",)

class DeckSerializer(serializers.ModelSerializer):
    card_count = serializers.SerializerMethodField()
    cards = CardSerializer(many=True, read_only=True)
    
    class Meta:
        model = Deck
        fields = ["id", "title", "cards", "card_count"]

    def get_card_count(self, obj):
        return Card.objects.filter(deck=obj).count()

        