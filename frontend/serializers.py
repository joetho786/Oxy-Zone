from rest_framework import serializers
from .models import Seller, Places

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ('id', 'name', 'email', 'password', 'selldetails')

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ('id', 'location', 'lattitude', 'longitude', 'seller')