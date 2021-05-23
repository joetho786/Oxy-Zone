from django.contrib import admin
from .models import Sellers, Places

class SellersAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password')

class PlacesAdmin(admin.ModelAdmin):
    list_display = ('foreign_id', 'location', 'phno', 'oxygenpricepercontainer')

# Register your models here.

admin.site.register(Sellers, SellersAdmin)
admin.site.register(Places, PlacesAdmin)
