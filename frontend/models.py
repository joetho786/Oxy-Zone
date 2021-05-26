from django.db import models
from django.db.models.fields.related import ForeignKey

class Sellers(models.Model):
    name = models.CharField(max_length=120)
    email = models.CharField(max_length=27)
    password = models.CharField(max_length=20)
    
    # selldetails = models.TextField()

    def _str_(self):
        return self.name

class Places(models.Model):
    foreign_seller = models.ForeignKey(Sellers, on_delete=models.CASCADE, null = False)
    location = models.TextField(null=False)
    addr = models.TextField(null=False)
    phno = models.IntegerField(null=False)
    oxyprice = models.FloatField(null=False)
    # noofcontainers = models.IntegerField()
    # seller = models.TextField()

    def _str_(self):
        return self.location