from django.db.models import fields
from rest_framework import serializers
from .models import Sellers, Places

class SellersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sellers
        fields = ('id', 'name', 'email')

class SellersLoginSerializer(serializers.ModelSerializer):

    condition = serializers.CharField(max_length=6)

    class Meta:
        model = Sellers
        fields = ('email', 'password', 'condition')

class SellersSignupSerializer(serializers.ModelSerializer):
    
    condition = serializers.CharField(max_length=6)

    class Meta:
        model = Sellers
        fields = ('name', 'email', 'password', 'condition')

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ('foreign_seller', 'location', 'addr', 'phno', 'oxyprice')

class SellersDetailsSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField()

    class Meta:
        model = Sellers
        fields = ('id',)

class PlacessaveoldSerializer(serializers.ModelSerializer):
    
    condition = serializers.CharField()
    type = serializers.CharField()

    class Meta:
        model = Places
        fields = ('location', 'addr', 'phno', 'oxyprice', 'id', 'newlocation', 'newaddr', 'newphno', 'newoxyprice')

class PlacessavenewSerializer(serializers.ModelSerializer):
    
    condition = serializers.CharField()
    type = serializers.CharField()

    class Meta:
        model = Places
        fields = ('location', 'addr', 'phno', 'oxyprice', 'id' )


class PlacesdeleteSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField()

    class Meta:
        model = Places
        fields = ('location', 'addr', 'phno', 'oxyprice', 'id' )

