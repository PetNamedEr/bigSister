from django.shortcuts import render

from .models import Aanestys
from .models import AanestysEdustaja
from .models import Istunto
from .models import MemberOfParliament
from .serializers import AanestysSerializer
from .serializers import IstuntoSerializer
from rest_framework import generics
from django.http import HttpResponse

import enum

class DataTypes(enum.Enum):
   Aanestys = 1
   Istunto = 2
   AanestysEdustaja = 3
   MemberOfParliament = 4

class AanestysListCreate(generics.ListCreateAPIView):
    print("aanestysListCreate! o/")
    queryset = Aanestys.objects.order_by('id')[:840]

    serializer_class = AanestysSerializer

class IstuntoListCreate(generics.ListCreateAPIView):
    queryset = Istunto.objects.all()[:10]
    serializer_class = IstuntoSerializer

class AanestysDetail(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = Aanestys.objects.all()
    serializer_class = AanestysSerializer

def createAanestysObject(jsonDataRow):
    otsikko = ""
    if (jsonDataRow[12] is None):
        otsikko = ""
    else:
        otsikko = jsonDataRow[12]

    if (jsonDataRow[1] == '1'):
        Aanestys.objects.create(aanestysId=jsonDataRow[0],\
            istuntoNumero=jsonDataRow[3],\
            vuosi=jsonDataRow[2],\
            kohtaOtsikko=jsonDataRow[21],\
            aanestysOtsikko=otsikko,\
            aanestysValtiopaivaasia=jsonDataRow[31],\
            aanestysPoytakirja=jsonDataRow[29],\
            aanestysTulosJaa=jsonDataRow[23],\
            aanestysTulosEi=jsonDataRow[24],\
            aanestysAlkuaika=jsonDataRow[9],\
            aanestysTulosPoissa=jsonDataRow[26])

def createAanestysEdustajaObject(aanestysId, edustajaAanestys, edustajaEtunimi, edustajaId, edustajaSukunimi):
    #print(jsonDataRow[0] + " " + jsonDataRow[3] + " " + jsonDataRow[2])
    AanestysEdustaja.objects.create(\
        aanestysId=aanestysId,\
        edustajaId=edustajaId,\
        edustajaAanestys=edustajaAanestys,\
        edustajaEtunimi=edustajaEtunimi,\
        edustajaSukunimi=edustajaSukunimi)

def createMemberOfParliamentObject(jsonDataRow):
    MemberOfParliament.objects.create(\
        personId=jsonDataRow[0],\
        firstname=jsonDataRow[2],\
        lastname=jsonDataRow[1])

def createIstuntoObject(jsonDataRow):
    Istunto.objects.create(\
        istuntoNumero=jsonDataRow[7],\
        vuosi=jsonDataRow[6])

def index(request):
    print("Hello there!")
    #fetchData(2015)
    #fetchData(2016)
    #fetchData(2017)
    #fetchData(2018)
    # seuraava:fetchData(2015)
    fetchData(2016)
    
    return HttpResponse("Äänestysdata fetched o/")

def fetchData(vuosi):
    #print("Haetaan istuntodata vuodelle " + str(vuosi))
    #fetchJsonDataForDatatypeForCustomFilter(DataTypes.Istunto, vuosi)
    print("Haetaan äänestys vuodelle " + str(vuosi))
    fetchJsonDataForDatatypeForCustomFilter(DataTypes.Aanestys, vuosi)
    #fetchJsonDataForDatatypeForCustomFilter(DataTypes.AanestysEdustaja, 43755)
    #fetchJsonDataForDatatypeForCustomFilter(DataTypes.MemberOfParliament, 0)
    fetchAanestysEdustajaRowsForYear(vuosi)

def fetchJsonDataForDatatypeForCustomFilter(dataType, customFilter):
    if (dataType == DataTypes.Aanestys):
        fetchJsonData2(createAanestysObject,\
            getFetchAanestysJsonDataForYearUrl,\
            customFilter)
    elif (dataType == DataTypes.Istunto):
        fetchJsonData2(createIstuntoObject,\
            getFetchIstuntoJsonDataForYearUrl,\
            customFilter)
    elif (dataType == DataTypes.AanestysEdustaja):
        fetchJsonData(createAanestysEdustajaObject,\
            getFetchAanestysEdustajaJsonDataForYearUrl,\
            customFilter)
    elif (dataType == DataTypes.MemberOfParliament):
        fetchJsonData2(createMemberOfParliamentObject,\
            getFetchMemberOfParliamentJsonDataForYearUrl,\
            customFilter)

def fetchJsonData(createObjectFunction, getUrlFunction, customFilter):
    hasMoreDataAvailable = True
    pageNo = 0
    rows = []
    howManyTries = 0
    #print("käsitellään " + str(customFilter))

    while (hasMoreDataAvailable == True):
        jsonData = fetchJsonFromUrl(getUrlFunction(pageNo, customFilter))
        
        rowData = jsonData["rowData"]
        for jsonDataRow in rowData:
            # createObjectFunction(jsonDataRow)
            rows.append(jsonDataRow[3] + "/" + jsonDataRow[2] + "/" + jsonDataRow[6] + "/" + jsonDataRow[0] + "/" + jsonDataRow[1])

        if (jsonData["hasMore"] == True):
            pageNo += 1
        else:
            rows = list(set(rows))
            if (len(rows) < 199):
                pageNo = 0
                howManyTries += 1
                if (howManyTries > 5):
                    print("### NOT FOUND: ###" + str(customFilter))
                    hasMoreDataAvailable = False
            else:
                hasMoreDataAvailable = False
                #rows = l
    # rows.sort()
    # print("löydettiin " + str(len(rows)))

    for r in rows:
        #r = r.replace(" ", "")
        #r = r.strip()
        r = r.split("/")
        '''print("!")
        print(r[0])
        print(r[1])
        print(r[2])
        print(r[3])
        print(r[4])'''
        createAanestysEdustajaObject(int(r[4]),r[2].replace(" ", ""),r[1],int(r[3]),r[0])
        #print(r)
        #print(len(r))

'''AanestysEdustaja.objects.create(\
        aanestysId=aanestysId,\
        edustajaAanestys=edustajaAanestys,\
        edustajaEtunimi=edustajaEtunimi,\
        edustajaId=edustajaId,\
        edustajaSukunimi=edustajaSukunimi)
        '''
        
def fetchJsonData2(createObjectFunction, getUrlFunction, customFilter):
    hasMoreDataAvailable = True
    pageNo = 0
    print("etsitään ")
    howManyFound = 0

    while (hasMoreDataAvailable == True):
        jsonData = fetchJsonFromUrl(getUrlFunction(pageNo, customFilter))
        
        rowData = jsonData["rowData"]
        for jsonDataRow in rowData:
            createObjectFunction(jsonDataRow)

        if (jsonData["hasMore"] == True):
            pageNo += 1
        else:
            hasMoreDataAvailable = False

'''
aanestysId=jsonDataRow[1],\
        edustajaId=jsonDataRow[0],\
        edustajaAanestys=jsonDataRow[6],\
        edustajaEtunimi=jsonDataRow[2],\
        edustajaSukunimi=jsonDataRow[3])'''

def fetchJsonFromUrl(url):
    import urllib
    res = urllib.request.urlopen(url).read()

    import json
    return json.loads(res)


def getFetchAanestysJsonDataForYearUrl(pageNo, year):
    return "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBAanestys/rows?perPage=100&page=" + str(pageNo) + "&columnName=IstuntoVPVuosi&columnValue=" + str(year)

def getFetchIstuntoJsonDataForYearUrl(pageNo, year):
    return "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBIstunto/rows?perPage=100&page=" + str(pageNo) + "&columnName=IstuntoVPVuosi&columnValue=" + str(year)

def getFetchAanestysEdustajaJsonDataForYearUrl(pageNo, aanestysId):
    return "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBAanestysEdustaja/rows?perPage=100&page=" + str(pageNo) + "&columnName=AanestysId&columnValue=" + str(aanestysId)

def getFetchMemberOfParliamentJsonDataForYearUrl(pageNo, aanestysId):
    return "https://avoindata.eduskunta.fi/api/v1/tables/MemberOfParliament/rows?perPage=100&page=" + str(pageNo)

def listAllAanestysRowsForIstuntoNumeroAndYear(istuntoNumero, year):
    return Aanestys.objects.filter(istuntoNumero=istuntoNumero,vuosi=year)

def listAllAanestysRowsForYear(year):
    return Aanestys.objects.filter(vuosi=year)

def listAllIstuntoRowsForYear(year):
    return Istunto.objects.filter(vuosi=year)

def fetchAanestysEdustajaRowsForYear(year):
    #istuntoRows = listAllIstuntoRowsForYear(year)
    #howManyIstuntosToProcess = len(istuntoRows)
    #howManyIstuntosProcessed = 0
    #for istunto in istuntoRows:
    #    howManyIstuntosProcessed += 1
    print("käsitellään vuosi " + str(year))
    #print(\
    #    "istunto " + str(howManyIstuntosProcessed) + " / " + str(howManyIstuntosToProcess))
    aanestysRows = listAllAanestysRowsForYear(year)
    howManyToProcess = len(aanestysRows)
    howManyProcessed = 0
    for aanestys in aanestysRows:
        howManyProcessed += 1
        print(str(aanestys.aanestysId) + \
            "käsitellään " + str(howManyProcessed) + " / " + str(howManyToProcess))
        fetchJsonDataForDatatypeForCustomFilter(DataTypes.AanestysEdustaja, aanestys.aanestysId)
