from rest_framework import serializers
from .models import Aanestys
from .models import Istunto

class AanestysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aanestys
        fields = ('aanestysOtsikko', 'aanestysValtiopaivaasia', 'istuntoNumero', 'vuosi')

class IstuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Istunto
        fields = ('istuntoNumero', 'vuosi')