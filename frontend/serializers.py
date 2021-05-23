from rest_framework import serializers
from .models import Sellers, Places

class SellersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sellers
        fields = ('id', 'name', 'email', 'password', 'condition')

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ('foreign_id', 'location', 'phno', 'oxygenpricepercontainer')