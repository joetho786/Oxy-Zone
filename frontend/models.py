from django.db import models
from django.db.models.fields.related import ForeignKey

class Sellers(models.Model):
    name = models.CharField(max_length=120)
    email = models.CharField(max_length=27)
    password = models.CharField(max_length=200)
    profilephoto = models.ImageField(upload_to='images/', default = 'default.png')
    # selldetails = models.TextField()

    def _str_(self):
        return self.name

class Places(models.Model):
    foreign_seller = models.ForeignKey(Sellers, on_delete=models.CASCADE, null = False)
    location = models.TextField()
    addr = models.TextField()
    phno = models.IntegerField()
    oxyprice = models.FloatField()
    # noofcontainers = models.IntegerField()
    # seller = models.TextField()

    def _str_(self):
        return self.location