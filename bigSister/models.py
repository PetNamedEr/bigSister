from django.db import models

class Istunto(models.Model):
    istuntoNumero = models.IntegerField()
    vuosi = models.IntegerField()

class Aanestys(models.Model):
    aanestysId = models.IntegerField()
    istuntoNumero = models.IntegerField()
    vuosi = models.IntegerField()
    aanestysOtsikko = models.CharField(max_length=1000)
    kohtaOtsikko = models.CharField(max_length=1000)
    aanestysValtiopaivaasia = models.CharField(max_length=50)
    aanestysPoytakirja = models.CharField(max_length=50)
    aanestysAlkuaika = models.CharField(max_length=50)
    aanestysTulosJaa = models.IntegerField()
    aanestysTulosEi = models.IntegerField()
    aanestysTulosPoissa = models.IntegerField()

class AanestysEdustaja(models.Model):
    aanestysId = models.IntegerField()
    edustajaId = models.IntegerField()
    edustajaAanestys = models.CharField(max_length=17)
    edustajaEtunimi = models.CharField(max_length=30)
    edustajaSukunimi = models.CharField(max_length=50)

class MemberOfParliament(models.Model):
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    personId = models.IntegerField()
