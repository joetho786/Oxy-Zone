from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SellersSerializer, PlacesSerializer
from .models import Sellers, Places
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class PlacesView(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()

# class PlacesView(viewsets.ModelViewSet):
#     serializer_class = PlaceSerializer
#     queryset = Place.objects.all()

class SellersView(APIView):
    serializer_class = SellersSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            nam = serializer.data.get('name')
            emai = serializer.data.get('email')
            pwd = serializer.data.get('password')
            condition = serializer.data.get('condition')
            # host = self.request.session.session_key
            queryset = Sellers.objects.filter(name = nam, email = emai, password = pwd)
            if queryset.exists():
                
                if condition == 'signup':
                    print('exists')

                elif condition == 'login':
                    # room = queryset[0]
                    # room.name = nam
                    # room.email = emai
                    # room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                    # return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
                    print('login')
            else:
                room = Sellers(name = nam, email = emai, password = pwd)
                room.save()
                return Response(SellersSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# class LoginView(viewsets.ModelViewSet):
#     serializer_class = SellersSerializer
#     queryset = Sellers.objects.all()
#     def post(self, request):
#         print(request.POST)