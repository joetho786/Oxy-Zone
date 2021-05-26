"""covidproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from frontend import views

router = routers.DefaultRouter()
router.register(r'sellers', views.SellersView, 'sellers')
router.register(r'places', views.PlacesView, 'places')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('details/', include(router.urls)),
    path('api/sellers/login/', views.SellersLoginView.as_view()),
    path('api/sellers/signup/', views.SellersSignupView.as_view()),
    path('api/sellers/details/', views.SellersdetailsView.as_view()),
    path('api/sellers/delete/', views.SellersdeleteView.as_view())
    path('api/sellers/save/', views.SellerssaveView.as_view())

]