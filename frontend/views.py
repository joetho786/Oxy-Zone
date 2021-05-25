from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SellerSerializer, PlacesSerializer
from .models import Seller, Places

# Create your views here.

class SellerView(viewsets.ModelViewSet):
    serializer_class = SellerSerializer
    queryset = Seller.objects.all()

class PlacesView(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()