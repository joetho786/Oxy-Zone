from django.contrib import admin
from .models import Seller, Places

class SellerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password', 'selldetails')

class PlacesAdmin(admin.ModelAdmin):
    list_display = ('location', 'lattitude', 'longitude', 'seller')

# Register your models here.

admin.site.register(Seller, SellerAdmin)
admin.site.register(Places, PlacesAdmin)
