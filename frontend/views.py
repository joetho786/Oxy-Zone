from django.http.response import Http404
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SellersDetailsSerializer, SellersSerializer, PlacesSerializer, SellersLoginSerializer, SellersSignupSerializer
from .models import Sellers, Places
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from frontend import serializers

# Create your views here.

class PlacesView(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()

class SellersView(viewsets.ModelViewSet):
    serializer_class = SellersSerializer
    queryset = Sellers.objects.all()

class SellersLoginView(APIView):
    serializer_class = SellersLoginSerializer

    # def get(self, request, format = None):
    #     print('get')
    #     print(request.data)

    def post(self, request, format=None):

        print('in')
        print(request.data)

        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            #nam = serializer.data.get('name')
            emai = serializer.data.get('email')
            pwd = serializer.data.get('password')
            condition = serializer.data.get('condition')

            print('valid')
            print(emai, pwd, condition)
            # host = self.request.session.session_key
            loginqueryset = Sellers.objects.filter(email = emai, password = pwd)

            if loginqueryset.exists():

                    print('loginexists')
                    print(loginqueryset)
                    room = Sellers.objects.get(email = emai, password = pwd)
                    print(room)

                    return Response(SellersSerializer(room).data, status=status.HTTP_201_CREATED)

                    #return Response({'Bad Request': 'it already exists...'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'msg': 'It doesnt exists.'}, status=status.HTTP_226_IM_USED )
                    
            # else:
            #     room = Sellers(name = nam, email = emai, password = pwd)
            #     room.save()

            #     return Response(SellersSerializer(room).data, status=status.HTTP_201_CREATED)

        print('oop')

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class SellersSignupView(APIView):
    serializer_class = SellersSignupSerializer

    def post(self, request, format=None):

        print('ins')
        print(request.data)

        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            nam = serializer.data.get('name')
            emai = serializer.data.get('email')
            pwd = serializer.data.get('password')
            condition = serializer.data.get('condition')

            print('valid')
            print(nam, emai, pwd, condition)
            # host = self.request.session.session_key
            signupqueryset = Sellers.objects.filter(email = emai)

                
            if signupqueryset.exists():
                    
                    print('exists')
                    return Response({'msg': 'It already exists.'}, status=status.HTTP_226_IM_USED)

            else:
                    print('creating')
                    room = Sellers(name = nam, email = emai, password = pwd)
                    room.save()
                    
                    return Response(SellersSerializer(room).data, status=status.HTTP_201_CREATED)

                    
            # else:
            #     room = Sellers(name = nam, email = emai, password = pwd)
            #     room.save()

            #     return Response(SellersSerializer(room).data, status=status.HTTP_201_CREATED)

        print('oops')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# class LoginView(viewsets.ModelViewSet):
#     serializer_class = SellersSerializer
#     queryset = Sellers.objects.all()
#     def post(self, request):
#         print(request.POST)

class SellersdetailsView(APIView):

    serializer_class = SellersDetailsSerializer

    def post(self, request, format=None):

        print('inside')
        print(request.data)
        print(type(request.data['id']))

        serializer = self.serializer_class(data=request.data)

        print(serializer)

        if serializer.is_valid():
            id = serializer.data.get('id')
            nam = serializer.data.get('name')

            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key
            sellerqueryset = Sellers.objects.filter(id = id, name = nam)

            print('sellerqueryset : ', sellerqueryset)


                
            if sellerqueryset.exists():
                print('exists')

                sellerquerydata = Sellers.objects.get(id = id, name = nam)

                print(sellerquerydata)

                placedata = Places.objects.filter(foreign_seller = sellerquerydata)
                print('count: ', placedata.count())
                count = placedata.count()

                if count != 0:

                    print('data exists')

                    getdata = Places.objects.get(foreign_seller = sellerquerydata)
                    print(getdata)

                    return Response({'Data': SellersDetailsSerializer(placedata).data}, status= status.HTTP_200_OK)

                else:
                    print('data doesnt exists')
                    return Response({'Data': 'No data'}, status = status.HTTP_226_IM_USED)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)      