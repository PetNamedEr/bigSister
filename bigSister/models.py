from django.db import models

class Istunto(models.Model):
    istuntoNumero = models.IntegerField()
    vuosi = models.IntegerField()
