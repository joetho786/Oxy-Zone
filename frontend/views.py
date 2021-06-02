from django.db.models import query
from django.http.response import Http404
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
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

class SellersView(viewsets.ModelViewSet):
    serializer_class = SellersSerializer
    #print(Sellers.objects.only('id', 'name', 'email' ))
    queryset = Sellers.objects.only('id', 'name', 'email' )
    #queryset = Sellers.objects.all()

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
            # img = serializer.data.get('profilephoto')
            condition = serializer.data.get('condition')

            print('valid')
            print(emai, pwd, condition)

            # pwd = pwd.encode('utf-8')
            # print('pwd : ', pwd)
            # hashed = str(bcrypt.hashpw(pwd, bcrypt.gensalt()))
            # print('hased :', hashed)
            
            # host = self.request.session.session_key
            loginqueryset = Sellers.objects.filter(email = emai, password = pwd)

            if loginqueryset.exists():

                    print('loginexists')
                    print(loginqueryset.values())
                    room = Sellers.objects.get(email = emai, password = pwd)
                    print(room)

                    hashed = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt(16))
                    print('hased :', hashed)

                    # if bcrypt.checkpw(pwd, hashed):
                    #     print("It Matches!")

                    #print((room).data)

                    

                    d = SellersLoginwithimgandpwdSerializer(room).data
                    d['password'] = hashed

                    return Response({'Data': d}, status=status.HTTP_201_CREATED)

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

                # pwd = pwd.encode('utf-8')
                # print('pwd : ', pwd)

                # hashed = bcrypt.hashpw(pwd, bcrypt.gensalt(16))
                # print('hased :', hashed)

                print('creating')
                room = Sellers(name = nam, email = emai, password = pwd)
                room.save()
                
                return Response({'Data' : 'succesfuly created'}, status=status.HTTP_201_CREATED)

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
            name = serializer.data.get('name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            print('pwd: ', password)


            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key
            sellerqueryset = Sellers.objects.filter(id = id, email = email, name = name)

            print('sellerqueryset : ', sellerqueryset)


                
            if sellerqueryset.exists():
                print('exists')

                sellerquerydata = Sellers.objects.get(id = id, email = email, name = name)

                print('here i am')



                print(sellerqueryset.values())

                if bcrypt.checkpw(sellerquerydata.password.encode('utf-8'), password.encode('utf-8')):
                    print("It Matches!")

                placedata = Places.objects.filter(foreign_seller = sellerquerydata)
                print(placedata.values())
                print('count: ', placedata.count())
                count = placedata.count()

                if count != 0:

                    print('data exists')

                    #getdata = Places.objects.get(foreign_seller = sellerquerydata)
                    #print(getdata)

                    result_serializer = PlacesSerializer(placedata, many = True)


                    print(result_serializer)

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

                    return Response({'Data': 'Saved data'}, status= status.HTTP_200_OK)

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

                return Response({'Data': 'Saved data'}, status = status.HTTP_200_OK)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)  

     
class Sellersdetailsbyid(APIView):
    
    serializer_class = SellersidSerializer

    def post(self, request, format=None):

        print('inside')
        print(request.data)

        serializer = self.serializer_class(data=request.data)

        print(serializer)

        if serializer.is_valid():
            id = serializer.data.get('id')

            print(id)
            # host = self.request.session.session_key


            sellerqueryset = Sellers.objects.filter(id = id)

            print('sellerqueryset : ', sellerqueryset.values())


            if sellerqueryset.exists():
                print('exists')

                sellerdata = Sellers.objects.get(id = id)

                returnserializer = SellersnameemailSerializer(sellerdata)

                print(returnserializer.data)

                return Response(returnserializer.data, status = status.HTTP_200_OK)

            print('id itself doesnt exists')
            return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)  


class SellersUpdateView(APIView):
    
    serializer_class = SellersupdatedetailsSerializer
    #serializer_class2 = Sellersupdatedetails2Serializer
    #serializer_class3 = Sellersupdatedetails3Serializer

    def post(self, request, format=None):

        print('inside')
        print(request.data)
        print(request.data['name'])

        print(
            request.data['id'], 
            request.data['name'], 
            request.data['email'], 
            request.data['oldname'], 
            request.data['oldemail'],
            request.data['cond'], 
            request.data['cond2'], 
            request.data['oldpassword'], 
            request.data['newpassword'], 
            request.data['profilephoto'],
            request.data['desc'],
        )

        serializer = self.serializer_class(data=request.data)
        #serializer2 = self.serializer_class2(data=request.data)
        #serializer3 = self.serializer_class3(data=request.data)

        print(serializer.is_valid())
        #print(serializer2.is_valid())
        #print(serializer3.is_valid())

        print(serializer)

        if serializer.is_valid():
            id = serializer.data.get('id')
            name = serializer.data.get('name')
            email = serializer.data.get('email')
            oldname = serializer.data.get('oldname')
            oldemail = serializer.data.get('oldemail')
            cond = serializer.data.get('cond')
            cond2 = serializer.data.get('cond2')
            oldp = serializer.data.get('oldpassword')
            newp = serializer.data.get('newpassword')
            photo = serializer.data.get('profilephoto')
            desc = serializer.data.get('desc')

            print('valid inside deatils')
            print(id)
            # host = self.request.session.session_key

            if cond == 'yes':
                
                sellerqueryset = Sellers.objects.filter(id = id, name = oldname, email = oldemail, password = oldp)

                print('sellerqueryset : ', sellerqueryset.values())

                if sellerqueryset.exists():
                    print('cond: yes -> exists')

                    if cond2 == 'yes':

                        sellerqueryset.update(name = name, email = email, password = newp, desc = desc, profilephoto = photo)
                        return Response({'Data': 'Saved data'}, status = status.HTTP_200_OK)

                    else: 

                        sellerqueryset.update(name = name, email = email, password = newp, desc = desc)
                        return Response({'Data': 'Saved data'}, status = status.HTTP_200_OK)

                else:
                    print('id itself doesnt exists')
                    return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)



            elif cond == 'no':

                sellerqueryset = Sellers.objects.filter(id = id, name = oldname, email = oldemail)

                print('sellerqueryset : ', sellerqueryset.values())

                if sellerqueryset.exists():
                    print('cond: no -> exists')

                    if cond2 == 'yes':

                        sellerqueryset.update(name = name, email = email, desc = desc, profilephoto = photo)
                        return Response({'Data': 'Saved data'}, status = status.HTTP_200_OK)

                    else:

                        sellerqueryset.update(name = name, email = email, desc = desc)
                        return Response({'Data': 'Saved data'}, status = status.HTTP_200_OK)

                else:
                    print('id itself doesnt exists')
                    return Response({'Data': 'Id itself is wrong'}, status = status.HTTP_226_IM_USED)

            else:
                print('condtion type wrong')
                return Response({'Data': 'condtion type wrong'}, status = status.HTTP_226_IM_USED)

        print('oopsie')
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)      

    
# class SellerstryView(APIView):
    
#     serializer_class = SellerstrySerializer
#     serializer_class2 = Sellerstry2Serializer

#     def post(self, request, format=None):

#         print('in try')
#         print(request.data)
#         print((request.data['profilephoto']))
#         print(type(request.data['profilephoto']))
#         photo = request.data['profilephoto']
#         print('now')
#         print(request.FILES)
#         print(request.FILES['profilephoto'])

#         trydata = Sellers(name = 'hehe', email = 'vinu@gmail.com', password = '123456', desc = 'hello', profilephoto = photo)
#         print(trydata)
#         trydata.save()

#         serializer = self.serializer_class(data=request.data)

#         serializer2 = self.serializer_class2(data=request.data)

#         print('1: ', serializer)
#         print(serializer.is_valid())

#         serializertype2 = self.serializer_class(data=request.FILES)

#         print('2: ', serializertype2)
#         print(serializertype2.is_valid())

#         print('3: ', serializer2)
#         print(serializer2.is_valid())

#         if serializer.is_valid():
#             print('valid')

#             return Response({'Data': 'Saved data'}, status = status.HTTP_200_OK)

#         else:
#             print('false')