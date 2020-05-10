from django.shortcuts import render

from .models import Istunto
from .serializers import IstuntoSerializer
from rest_framework import generics
from django.http import HttpResponse

#def tellTheNumbers():
#    print('4 8 15 16 23 42.....!')

class IstuntoListCreate(generics.ListCreateAPIView):
    queryset = Istunto.objects.all()
    #tellTheNumbers()
    serializer_class = IstuntoSerializer

def index(request):
    print("Helldas O!")
    import matplotlib.pyplot as plt
    #url = "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBAanestys/rows?perPage=41&columnName=IstuntoVPVuosi&columnValue=2020"
    #url = "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBAanestysEdustaja/rows?perPage=100&page=0&columnName=AanestysId&columnValue=13259"
    print(fetchIstuntosForYear(2020))
    return HttpResponse("Hello, world. You're at the polls index.")

def fetchIstuntosForYear(year):
    istuntoJsonData = fetchJsonFromUrl(getFetchIstuntosForYearUrl(2020))
    return getIstuntoNumerosFromIstuntoJsonData(istuntoJsonData)

def getFetchIstuntosForYearUrl(year):
    return "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBIstunto/rows?perPage=100&page=0&columnName=IstuntoVPVuosi&columnValue=" + str(year)

def fetchJsonFromUrl(url):
    import urllib
    res = urllib.request.urlopen(url).read()

    import json
    return json.loads(res)

def getIstuntoNumerosFromIstuntoJsonData(istuntoJsonData):
    return [str(jsonDataRow[7]) for jsonDataRow in istuntoJsonData["rowData"]]