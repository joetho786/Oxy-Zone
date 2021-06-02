from django.db.models import fields
from rest_framework import serializers
from .models import Sellers, Places
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import IntegerField


class SellersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sellers
        fields = ('id', 'name', 'email' )

class SellersLoginSerializer(serializers.ModelSerializer):

    condition = serializers.CharField(max_length=6)

    class Meta:
        model = Sellers
        fields = ('email', 'password', 'condition')

class SellersLoginwithimgandpwdSerializer(serializers.ModelSerializer):
    
    #condition = serializers.CharField(max_length=6)

    class Meta:
        model = Sellers
        fields = ('id', 'name', 'email', 'password', 'profilephoto')

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
        fields = ('id', 'name', 'email', 'password', 'profilephoto' )

class SellersupdatedetailsSerializer(serializers. ModelSerializer):

    class Meta:
        models = Sellers
        fields = ('id', 'name', 'email', 'password', 'profilephoto' )

class PlacessaveoldSerializer(serializers.ModelSerializer):
    
    #condition = serializers.CharField()
    #type = serializers.CharField()
    oldlocation = serializers.CharField()
    oldaddr = serializers.CharField()
    oldphno = serializers.IntegerField()
    oldoxyprice = serializers.FloatField()

    id = serializers.IntegerField()

    class Meta:
        model = Places
        fields = ('location', 'addr', 'phno', 'oxyprice', 'id', 'oldlocation', 'oldaddr', 'oldphno', 'oldoxyprice')

class PlacessavenewSerializer(serializers.ModelSerializer):
    
    #condition = serializers.CharField()
    #type = serializers.CharField()

    id = serializers.IntegerField()

    class Meta:
        model = Places
        fields = ('location', 'addr', 'phno', 'oxyprice', 'id' )


class PlacesdeleteSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField()

    class Meta:
        model = Places
        fields = ('location', 'addr', 'phno', 'oxyprice', 'id' )

class SellersidSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField()

    class Meta:
        model = Sellers
        fields = ('id', )


class SellersnameemailSerializer(serializers.ModelSerializer):
    
    #name = serializers.CharField()

    class Meta:
        model = Sellers
        fields = ('name', 'email')