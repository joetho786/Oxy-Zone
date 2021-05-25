from django.db import models

class Seller(models.Model):
    name = models.CharField(max_length=120)
    email = models.CharField(max_length=27)
    password = models.CharField(max_length=20)
    selldetails = models.TextField()

    def _str_(self):
        return self.name

class Places(models.Model):
    location = models.TextField()
    lattitude = models.FloatField()
    longitude = models.FloatField()
    seller = models.TextField()

    def _str_(self):
        return self.location