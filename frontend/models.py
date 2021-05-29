from django.db import models
from django.db.models.fields.related import ForeignKey

class Sellers(models.Model):
    name = models.CharField(max_length=120)
    email = models.CharField(max_length=27)
<<<<<<< HEAD
    password = models.CharField(max_length=200)
=======
    password = models.CharField()
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
    
    # selldetails = models.TextField()

    def _str_(self):
        return self.name

class Places(models.Model):
    foreign_seller = models.ForeignKey(Sellers, on_delete=models.CASCADE, null = False)
    location = models.TextField()
    phno = models.IntegerField()
    oxygenpricepercontainer = models.FloatField()
    # noofcontainers = models.IntegerField()
    # seller = models.TextField()

    def _str_(self):
        return self.location