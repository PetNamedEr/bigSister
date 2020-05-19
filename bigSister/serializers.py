from rest_framework import serializers
from .models import Aanestys
from .models import Istunto

class AanestysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aanestys
        fields = (\
            'aanestysAlkuaika',\
            'aanestysOtsikko',\
            'aanestysTulosEi',\
            'aanestysTulosJaa',\
            'aanestysTulosPoissa',\
            'aanestysValtiopaivaasia',\
            'id',\
            'istuntoNumero',\
            'kohtaOtsikko',\
            'vuosi')

class IstuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Istunto
        fields = ('istuntoNumero', 'vuosi')