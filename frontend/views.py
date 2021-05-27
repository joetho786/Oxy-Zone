from django.http.response import Http404
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SellersDetailsSerializer, SellerswithpwdSerializer, SellersSerializer, PlacesSerializer, SellersLoginSerializer, SellersSignupSerializer, PlacesdeleteSerializer, PlacessaveoldSerializer, PlacessavenewSerializer
from .models import Sellers, Places
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

import bcrypt

from frontend import serializers

# Create your views here.

class PlacesView(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()
    print(queryset)

class SellersView(viewsets.ModelViewSet):
    serializer_class = SellersSerializer
    print(Sellers.objects.only('id', 'name', 'email'))
    queryset = Sellers.objects.only('id', 'name', 'email')

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

                    return Response(SellerswithpwdSerializer(room).data, status=status.HTTP_201_CREATED)

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
                    
                    return Response({'Data' : 'succesfuly created'}, status=status.HTTP_201_CREATED)

        print('oops')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



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
            name = serializer.data.get('name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')


            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key
            sellerqueryset = Sellers.objects.filter(id = id, email = email, name = name, password = password)

            print('sellerqueryset : ', sellerqueryset)


                
            if sellerqueryset.exists():
                print('exists')

                sellerquerydata = Sellers.objects.get(id = id, email = email, name = name, password = password)

                print(sellerquerydata)

                placedata = Places.objects.filter(foreign_seller = sellerquerydata)
                print(placedata.values())
                print('count: ', placedata.count())
                count = placedata.count()

                if count != 0:

                    print('data exists')

                    #getdata = Places.objects.get(foreign_seller = sellerquerydata)
                    #print(getdata)

                    result_serializer = PlacesSerializer(placedata, many = True)

                    return Response({'Data': result_serializer.data}, status= status.HTTP_200_OK)

                else:
                    print('data doesnt exists')
                    return Response({'Data': 'No data'}, status = status.HTTP_226_IM_USED)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)      

class SellersdeleteView(APIView):
    
    serializer_class = PlacesdeleteSerializer

    def post(self, request, format=None):

        print('inside')
        print(request.data)
        print(type(request.data['id']))

        serializer = self.serializer_class(data=request.data)

        print(serializer)

        if serializer.is_valid():
            id = serializer.data.get('id')
            location = serializer.data.get('location')
            addr = serializer.data.get('addr')
            phno = serializer.data.get('phno')
            oxyprice = serializer.data.get('oxyprice')

            #nam = serializer.data.get('name')

            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key


            sellerqueryset = Sellers.objects.filter(id = id)

            print('sellerqueryset : ', sellerqueryset.values())


            if sellerqueryset.exists():
                print('exists')

                sellerdata = Sellers.objects.get(id = id)

                print('sellerdata: ', sellerdata)

                placequerydata = Places.objects.filter(foreign_seller = sellerdata, location = location, addr = addr, phno = phno, oxyprice = oxyprice)

                print(placequerydata.values())

                print('count: ', placequerydata.count())
                count = placequerydata.count()

                if count != 0:

                    print('data exists')


                    placequerydata.delete()

                    return Response({'Data': 'successfully deleted'}, status= status.HTTP_200_OK)

                else:
                    print('data doesnt exists')
                    return Response({'Data': 'No data'}, status = status.HTTP_226_IM_USED)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)      

class SellerssaveoldView(APIView):
    
    serializer_class = PlacessaveoldSerializer

    def post(self, request, format=None):

        print('inside')
        print(request.data)
        print(type(request.data['id']))

        serializer = self.serializer_class(data=request.data)

        print(serializer)

        if serializer.is_valid():
            id = serializer.data.get('id')
            location = serializer.data.get('location')
            addr = serializer.data.get('addr')
            phno = serializer.data.get('phno')
            oxyprice = serializer.data.get('oxyprice')
            oldlocation = serializer.data.get('oldlocation')
            oldaddr = serializer.data.get('oldaddr')
            oldphno = serializer.data.get('oldphno')
            oldoxyprice = serializer.data.get('oldoxyprice')

            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key


            sellerqueryset = Sellers.objects.filter(id = id)

            print('sellerqueryset : ', sellerqueryset.values())


            if sellerqueryset.exists():
                print('exists')

                sellerdata = Sellers.objects.get(id = id)

                placequerydata = Places.objects.filter(foreign_seller = sellerdata, location = oldlocation, addr = oldaddr, phno = oldphno, oxyprice = oldoxyprice)

                print(placequerydata.values())

                # placedata = Places.objects.filter(foreign_seller = sellerquerydata)
                # print(placedata.values())
                print('count: ', placequerydata.count())
                count = placequerydata.count()

                if count != 0:

                    print('data exists')

                    #getdata = Places.objects.get(foreign_seller = sellerquerydata)
                    #print(getdata)

                    placequerydata.update(location = location, phno = phno, addr = addr, oxyprice = oxyprice)

                    result_serializer = PlacesSerializer(placequerydata, many = True)

                    return Response({'Data': result_serializer.data}, status= status.HTTP_200_OK)

                else:
                    print('data doesnt exists')
                    return Response({'Data': 'No data'}, status = status.HTTP_226_IM_USED)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)      

class SellerssavenewView(APIView):
    
    serializer_class = PlacessavenewSerializer

    def post(self, request, format=None):

        print('inside')
        print(request.data)
        print(type(request.data['id']))

        serializer = self.serializer_class(data=request.data)

        print(serializer)

        if serializer.is_valid():
            id = serializer.data.get('id')
            location = serializer.data.get('location')
            addr = serializer.data.get('addr')
            phno = serializer.data.get('phno')
            oxyprice = serializer.data.get('oxyprice')

            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key


            sellerqueryset = Sellers.objects.filter(id = id)

            print('sellerqueryset : ', sellerqueryset.values())


            if sellerqueryset.exists():
                print('exists')

                sellerdata = Sellers.objects.get(id = id)

                placequerydata = Places(foreign_seller = sellerdata, location = location, addr = addr, phno = phno, oxyprice = oxyprice)
                placequerydata.save()
                # print(placequerydata)

                # placedata = Places.objects.filter(foreign_seller = sellerquerydata)
                # print(placedata.values())
                # print('count: ', placedata.count())
                # count = placedata.count()

                # if count != 0:

                    # print('data exists')

                    # #getdata = Places.objects.get(foreign_seller = sellerquerydata)
                    # #print(getdata)

                    # result_serializer = PlacesSerializer(placedata, many = True)

                    # return Response({'Data': result_serializer.data}, status= status.HTTP_200_OK)

                # else:
                    # print('data doesnt exists')
                return Response({'Data': 'Saved data'}, status = status.HTTP_226_IM_USED)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)      

