from rest_framework import serializers
from .models import Istunto

class IstuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Istunto
        fields = ('istuntoNumero', 'vuosi')